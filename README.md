# Vero

## 🧠 Problem Statement

Misinformation spreads rapidly during crises such as pandemics, elections, financial scams, natural disasters, and local emergencies. This false information often creates panic, confusion, and distrust among the public. Most people lack the tools or time to verify whether a piece of news or a claim is real or fake.

## 💡 Description of Your Solution

We aim to build an Agentic AI–powered misinformation detection system that can autonomously monitor multiple sources of information, detect emerging misinformation trends, and provide fact-checked, easy-to-understand explanations to the public in real time.

## The system will work in three layers:

### Monitoring Layer (Agentic AI behavior)

Continuously scan online content streams like news APIs or user-submitted claims.

Detect suspicious or trending misinformation topics using keyword filtering and basic NLP.

### Verification Layer

Cross-verify the claims using trusted fact-checking APIs (e.g., Google Fact Check Tools API) and news sources.

Use OpenAI API (optional) to generate human-friendly explanations and context.

### Communication Layer

Display verified results, explanations, and trending misinformation in a simple, accessible web dashboard.

Provide real-time updates to help users make informed decisions.

## 💡 What makes this “Agentic AI”:

It’s autonomous — automatically fetches and verifies data without human input.

It reasons — uses APIs and AI models to determine credibility.

It acts — delivers contextual explanations and alerts to the public.

It learns patterns over time through stored misinformation trends.

This solution can be used during crises (e.g., pandemics), major events (e.g., elections), or everyday misinformation scenarios (e.g., fake investment scams).

## 🧰 Technologies You Plan to Use
### 🖥️ Frontend

HTML – structure and content

CSS – styling and responsive design

JavaScript – dynamic behavior and API integration

### ☁️ Backend / Database

Firebase – for real-time data storage, authentication, and hosting

Firebase Cloud Functions – for automated background tasks like periodic misinformation scanning

### 🧠 APIs & AI Tools

Google Fact Check Tools API – fact verification of claims

News API – fetch latest global and local news trends

OpenAI API (optional) – to generate natural language explanations and summaries

### 🧰 Other

Basic NLP/keyword filtering for initial misinformation detection

Cron or Firebase Scheduler for periodic agent automation

Version control using GitHub

## Project link - 
