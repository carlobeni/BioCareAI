//------------------------------------SENSOR SECTION--------------------------------------------

#include <Wire.h>
#include "MAX30105.h" //sparkfun MAX3010X library
MAX30105 particleSensor;

#define TIMEOUT 30 // Time out second to sleep
// HARDWARE DEFINITION
#define LED_SOUND_INDICATOR
#define LEDPORT GPIO_NUM_15
#define SPO2_HRM_SWITCH GPIO_NUM_4
#define SPEAKER GPIO_NUM_12
#define LCD_BACKLIGHT GPIO_NUM_32
#define WAKEUP_SLEEP GPIO_NUM_33
#define BOOTSOUND 440     // Hz
#define BLIPSOUND 440 * 2 // Hz A

double aveRed = 0;    // DC component of RED signal
double aveIr = 0;     // DC component of IR signal
double sumIrRMS = 0;  // sum of IR square
double sumRedRMS = 0; // sum of RED square
unsigned int i = 0;   // loop counter
#define SUM_CYCLE 100
int Num = SUM_CYCLE; // calculate SpO2 by this sampling interval
double eSpO2 = 95.0; // initial value of estimated SpO2
double fSpO2 = 0.7;  // filter factor for estimated SpO2
double fRate = 0.95; // low pass filter for IR/red LED value to eliminate AC component

#define TIMETOBOOT 3000 // wait for this time(msec) to output SpO2
#define SCALE 88.0      // adjust to display heart beat and SpO2 in Arduino serial plotter at the same time
#define SAMPLING 1      // if you want to see heart beat more precisely , set SAMPLING to 1
#define FINGER_ON 50000 // if ir signal is lower than this , it indicates your finger is not on the sensor
#define MINIMUM_SPO2 0
#define MAX_SPO2 100.0
#define MIN_SPO2 80.0

void initSensor()
{
  Serial.println("Initializing max30105...");
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) // Use default I2C port, 400kHz speed
  {
    Serial.println("MAX3010X was not found.");
  }
  byte ledBrightness = 0x7F; // Options: 0=Off to 255=50mA
  byte sampleAverage = 4;    // Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2;          // Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  // Options: 1 = IR only, 2 = Red + IR on MH-ET LIVE MAX30102 board
  int sampleRate = 200; // Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; // Options: 69, 118, 215, 411
  int adcRange = 16384; // Options: 2048, 4096, 8192, 16384
  // Set up the wanted parameters
  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); // Configure sensor with these settings
}
// Heart Rate
// max 180bpm - min 45bpm
#define FINGER_ON 50000 // if ir signal is lower than this , it indicates your finger is not on the sensor
#define LED_PERIOD 100  // light up LED for this period in msec when zero crossing is found for filtered IR signal
#define MAX_BPS 180
#define MIN_BPS 45

double HRM_estimator(double fir, double aveIr)
{
  static double fbpmrate = 0.95;      // low pass filter coefficient for HRM in bpm
  static uint32_t crosstime = 0;      // falling edge , zero crossing time in msec
  static uint32_t crosstime_prev = 0; // previous falling edge , zero crossing time in msec
  static double bpm = 60.0;
  static double ebpm = 60.0;
  static double eir = 0.0;      // estimated lowpass filtered IR signal to find falling edge without notch
  static double firrate = 0.85; // IR filter coefficient to remove notch , should be smaller than fRate
  static double eir_prev = 0.0;

  // Heart Rate Monitor by finding falling edge
  eir = eir * firrate + fir * (1.0 - firrate); // estimated IR : low pass filtered IR signal
  if (((eir - aveIr) * (eir_prev - aveIr) < 0) && ((eir - aveIr) < 0.0))
  {                       // find zero cross at falling edge
    crosstime = millis(); // system time in msec of falling edge
    // Serial.print(crosstime); Serial.print(","); Serial.println(crosstime_prev);
    if (((crosstime - crosstime_prev) > (60 * 1000 / MAX_BPS)) && ((crosstime - crosstime_prev) < (60 * 1000 / MIN_BPS)))
    {
      bpm = 60.0 * 1000.0 / (double)(crosstime - crosstime_prev); // get bpm
      ebpm = ebpm * fbpmrate + (1.0 - fbpmrate) * bpm;            // estimated bpm by low pass filtered
    }
    crosstime_prev = crosstime;
  }
  eir_prev = eir;
  return (ebpm);
}
double SpO2 = 0; // raw SpO2 before low pass filtered
double Ebpm = 0; // estimated Heart Rate (bpm)
void updateSpo2andBPM()
{
  uint32_t ir, red;       // raw data
  double fred, fir;       // floating point RED ana IR raw values
  particleSensor.check(); // Check the sensor, read up to 3 samples

  if (particleSensor.available())
  {

#ifdef MAX30105
    red = particleSensor.getFIFORed(); // Sparkfun's MAX30105
    ir = particleSensor.getFIFOIR();   // Sparkfun's MAX30105
#else
    red = particleSensor.getFIFOIR(); // why getFOFOIR output Red data by MAX30102 on MH-ET LIVE breakout board
    ir = particleSensor.getFIFORed(); // why getFIFORed output IR data by MAX30102 on MH-ET LIVE breakout board
#endif
    i++;
    fred = (double)red;
    fir = (double)ir;
    aveRed = aveRed * fRate + (double)red * (1.0 - fRate); // average red level by low pass filter
    aveIr = aveIr * fRate + (double)ir * (1.0 - fRate);    // average IR level by low pass filter
    sumRedRMS += (fred - aveRed) * (fred - aveRed);        // square sum of alternate component of red level
    sumIrRMS += (fir - aveIr) * (fir - aveIr);             // square sum of alternate component of IR level

    Ebpm = HRM_estimator(fir, aveIr); // Ebpm is estimated BPM

    if ((i % Num) == 0)
    {
      double R = (sqrt(sumRedRMS) / aveRed) / (sqrt(sumIrRMS) / aveIr);
#ifdef MAXIMREFDESIGN
      SpO2 = -45.060 * R * R + 30.354 * R + 94.845;
#else
#define OFFSET 0.0
      SpO2 = -23.3 * (R - 0.4) + 100 - OFFSET;
      if (SpO2 > 100.0)
        SpO2 = 100.0;
#endif
      eSpO2 = fSpO2 * eSpO2 + (1.0 - fSpO2) * SpO2;
      sumRedRMS = 0.0;
      sumIrRMS = 0.0;
      i = 0;
    }
    particleSensor.nextSample();

    if ((i % SAMPLING) == 0)
    {
      if (millis() > TIMETOBOOT)
      {
        if (ir < FINGER_ON)
        {
          Ebpm = 0;
          eSpO2 = 0;
        }
      }
    }
  }
}

//------------------------------------WEB SECTION--------------------------------------------
// Web library and constants
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

#include <Arduino.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
/// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

/*
// Insert your network credentials
#define WIFI_SSID "LLAP"
#define WIFI_PASSWORD "alphabetha2357"
*/
#define WIFI_SSID "BC_family"
#define WIFI_PASSWORD "nogamenolife1204"

// Insert Firebase project API Key
#define API_KEY "AIzaSyDQDConDrltB2CmZ6kizAHpe7TzWxaN0bs"
// Insert Authorized Email and Corresponding Password
#define USER_EMAIL "carlosbenitez@fiuna.edu.py"
#define USER_PASSWORD "nogamenolife1204"
// Insert RTDB URLefine the RTDB URL
#define DATABASE_URL "https://biocareai-default-rtdb.firebaseio.com/"
// Define Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
// Variable to save USER UID
String uid;
// Database main path (to be updated in setup with the user UID)
String databasePath;

// Database child nodes
String tempPath = "/temperature";
String spo2Path = "/spo2";
String bpmPath = "/bpm";
String timePath = "/timestamp";

// Parent Node (to be updated in every loop)
String parentPath;
FirebaseJson json;

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

// Variable to save current epoch time
int timestamp;

// Timer variables (send new readings every three minutes)
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 500;

// Initialize WiFi
void initWiFi()
{
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  Serial.println();
}

// Function that gets current epoch time
unsigned long getTime()
{
  timeClient.update();
  unsigned long now = timeClient.getEpochTime();
  return now;
}

void initFirebase()
{
  timeClient.begin();

  // Assign the api key (required)
  config.api_key = API_KEY;

  // Assign the user sign in credentials
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  // Assign the RTDB URL (required)
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  // Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  // Assign the maximum retry of token generation
  config.max_token_generation_retry = 5;

  // Initialize the library with the Firebase authen and config
  Firebase.begin(&config, &auth);

  // Getting the user UID might take a few seconds
  Serial.println("Getting User UID");
  while ((auth.token.uid) == "")
  {
    Serial.print('.');
    delay(1000);
  }
  // Print user UID
  uid = auth.token.uid.c_str();
  Serial.print("User UID: ");
  Serial.println(uid);

  // Update database path
  databasePath = "/UsersData/" + uid;
}

void setup()
{
  Serial.begin(115200);
  initSensor();
  initWiFi();
  initFirebase();
}

void loop()
{

  updateSpo2andBPM();

  //Send new data
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0))
  {
    sendDataPrevMillis = millis();
    parentPath = databasePath;

    if (Ebpm!=0 && SpO2!=0)
    {
      json.set(bpmPath.c_str(), String(Ebpm));
      json.set(spo2Path.c_str(), String(SpO2));
      json.set(tempPath.c_str(), String(35));
      json.set(timePath, String(getTime()));
      Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());
      
      Serial.println();
      Serial.print("Enviado: BPM/Sp02: ");
      Serial.print(Ebpm);
      Serial.print("/");
      Serial.print(SpO2);
      Serial.println();
    }
  }
}
