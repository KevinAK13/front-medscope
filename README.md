# MedScope - KI-gestützte medizinische Bildanalyse

## Überblick
MedScope ist eine experimentelle Plattform, die künstliche Intelligenz zur Analyse medizinischer Bilder und zur Unterstützung bei der frühen Erkennung von Krankheiten nutzt. Die Plattform integriert Deep-Learning-Modelle zur Mustererkennung in medizinischen Bildgebungen und bietet interaktive Beratung durch eine medizinische KI.

## Hauptfunktionen
- **Bildanalyse mit KI:** Hochentwickelte Modelle analysieren medizinische Bilder zur Erkennung möglicher Anomalien.
- **Interaktive medizinische Beratung:** KI-gestützte Konsultationen zu Symptomen, Behandlungen und Diagnosen.
- **Unterstützung mehrerer Sprachen:** Verfügbar in Deutsch, Englisch und Spanisch.
- **Integration mit ChromaDB:** Sucht in wissenschaftlichen Datenbanken (PubMed, WHO, AHA) nach relevanten Informationen.
- **Erweiterte Markdown-Unterstützung:** Verbesserte Textformatierung mit Syntax-Highlighting für Codeabschnitte.

## Verwendete Technologien
- **Frontend:** Next.js 15, Tailwind CSS
- **Backend:** Node.js, NestJS, FastAPI
- **Datenbanken:** PostgreSQL, ChromaDB
- **KI-Modelle:** TensorFlow/Keras für Bildanalyse, OpenAI GPT-4 für medizinische Konsultationen
- **Deployment:** Docker-Container, Vercel (Frontend), Railway (Backend)

## Installation & Nutzung
1. **Repository klonen:**
   ```bash
   git clone https://github.com/KevinAK13/front-medscope.git
   cd front-medscope
   ```
2. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```
3. **Umgebungsvariablen setzen:** Füge eine `.env.local`-Datei hinzu und definiere OpenAI- und ChromaDB-API-Schlüssel.
4. **Starten der Anwendung:**
   ```bash
   npm run dev
   ```

## Lizenz & Haftungsausschluss
MedScope ist ein Forschungsprojekt und ersetzt keine professionelle medizinische Beratung. Die bereitgestellten Informationen dienen nur zu Bildungszwecken. Nutzer sollten sich immer an medizinische Fachkräfte wenden.

## Kontakt & Mitwirkung
Interessiert an der Entwicklung? Beiträge sind willkommen! Besuche unser GitHub-Repository für weitere Informationen.

