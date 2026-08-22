# DAROS: Dynamic Ambulance Route Optimization System 🚑⚡

DAROS is a real-time Emergency Medical Services (EMS) dispatching platform designed to optimize response times during the critical "Golden Hour."[cite: 1] It combines GIS routing via OSRM, a live paramedic portal, and streaming patient telemetry directly to receiving hospital emergency departments[cite: 1].

## 🌟 Key Features
- **Accurate Routing:** Uses OSRM & $A^*$ algorithm for road-network pathfinding[cite: 1].
- **Priority Scoring:** Evaluates ambulance distance, inventory readiness, and operational status[cite: 1].
- **Real-Time Telemetry:** Continuous streaming of vital signs ($BP, BPM, SpO_2$) via Firebase[cite: 1].
- **Hospital Dashboard:** Updates Estimated Time of Arrival (ETA) dynamically to allow pre-arrival emergency setup[cite: 1].

## 🛠️ Tech Stack
- **Frontend / Mapping:** Leaflet.js, JavaScript, HTML5/CSS3[cite: 1]
- **Routing Engine:** OpenSource Routing Machine (OSRM)[cite: 1]
- **Backend / Realtime DB:** Firebase Firestore[cite: 1]
- **Hardware Integration:** IoT Sensors (Simulated / Hardware Modules)

## 📊 System Architecture
`Data Acquisition (Ambulance)` ➔ `OSRM Processing Layer` ➔ `Leaflet.js Map UI` ➔ `Firebase Hospital Dashboard`[cite: 1]

## 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone (https://github.com/Sanchit1307/DAROS.git)