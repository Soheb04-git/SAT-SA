**SAT**-SA is designed around evidence-linked reasoning.

Each signal should provide context such as:

Signal → Reason → Evidence → Baseline/Peer Context → Review Priority

This allows a supervisor to understand:

Why the signal was generated Which evidence supports it What comparison or rule was used What should be reviewed next Human-in-the-Loop

**SAT**-SA does not replace supervisory judgement.

The intended workflow is:

**SAT**-SA identifies a signal

↓

**SAT**-SA explains the signal

↓

**SAT**-SA prioritizes the evidence

↓

Human supervisor reviews

↓

Human supervisor makes the final assessment

Technology
### Current Prototype
**HTML5**
**CSS3**
JavaScript
Tailwind **CSS**
### Lucide Icons
**SVG**
Browser-based **CSV**/**JSON** validation
Synthetic in-memory demonstration data
## Target Production Architecture

The target architecture is designed for secure, scalable deployment within an
on-premise and air-gapped environment.

### Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Python, FastAPI |
| **Analytics** | Pandas, NumPy, SciPy, Scikit-learn, Statsmodels |
| **Data Storage** | PostgreSQL, MinIO |
| **Identity & Access** | Keycloak, RBAC |
| **Security & Audit** | Audit Logging, Encryption, Access Control |
| **Deployment** | Docker, Linux, Air-Gapped Infrastructure |

### Technology Overview

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="45" alt="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="45" alt="Vite"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="45" alt="Python"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" width="45" alt="FastAPI"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" width="45" alt="Pandas"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" width="45" alt="NumPy"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scipy/scipy-original.svg" width="45" alt="SciPy"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" width="45" alt="Scikit-learn"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="45" alt="PostgreSQL"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="45" alt="Docker"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="45" alt="Linux"/>
</p>

## Setup Instructions

### Prerequisites

For the current SAT-SA prototype, you only need:

- A modern web browser
- Git (only if cloning the repository)
- Python 3.x (optional, only if using a local HTTP server)

Recommended browsers:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

The current prototype does not require a backend server, database, Node.js, or any Python package installation.

### 1. Clone the Repository

    git clone https://github.com/Soheb04-git/SAT-SA.git
    cd SAT-SA

### 2. Open the Prototype Directly

Navigate to:

    prototype/index.html

Open `index.html` in a modern web browser.

### 3. Run Using a Local HTTP Server (Recommended)

For a more consistent browser environment, run the prototype through a local HTTP server.

Using Python:

    python -m http.server 8000

Then open:

    http://localhost:8000/prototype/

### 4. Start the Demonstration

After opening the SAT-SA prototype:

1. Open the SAT-SA dashboard.
2. Load the Synthetic Demo Dataset.
3. Run the analysis workflow.
4. Review the detected supervisory findings.
5. Open the Evidence Explorer.
6. Inspect the supporting evidence.
7. Open the Review Queue.
8. Select a priority review item.
9. Drill down into the associated evidence and rationale.
10. Review the methodology section to understand the analytical workflow.

### 5. Recommended Demo Flow

    Overview
       ↓
    Synthetic Demo Dataset
       ↓
    Analysis Workflow
       ↓
    Entities
       ↓
    Findings
       ↓
    Evidence Explorer
       ↓
    Review Queue
       ↓
    Human Supervisory Review

### Note

The current prototype demonstrates the SAT-SA workflow using synthetic SOC evidence. It is a browser-based demonstration and does not represent the complete production deployment.

The proposed production architecture is designed for NCIIPC-controlled, local and fully air-gapped deployment with secure data processing, persistent storage, access control, audit logging, and scalable multi-CSE analytics.

### Architecture Flow

```text
┌───────────────────────────────────────────────────────────────┐
│                    SUPERVISORY INTERFACE                     │
│                 React + TypeScript + Vite                    │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                         API LAYER                             │
│                    Python + FastAPI                           │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                     ANALYTICS ENGINE                          │
│  Pandas │ NumPy │ SciPy │ Scikit-learn │ Statsmodels        │
└──────────────────────────────┬────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                   EVIDENCE & DATA LAYER                       │
│             PostgreSQL │ MinIO / Local Storage                │
└──────────────────────────────┬────────────────────────────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌─────────────────┐         ┌────────────────────┐
        │    Keycloak     │         │   Audit Logging    │
        │      RBAC       │         │   Traceability     │
        └─────────────────┘         └────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────┐
│              ON-PREMISE / AIR-GAPPED ENVIRONMENT              │
│                    Docker + Linux                             │
└───────────────────────────────────────────────────────────────┘
```


---

## Current Prototype

The current prototype is a browser-based demonstration of the SAT-SA
supervisory analytics workflow.

```text
                    ┌───────────────────────┐
                    │        Browser        │
                    │     SAT-SA Prototype  │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐       ┌────────────────┐      ┌─────────────────┐
│ User Interface│       │ Dataset        │      │ Demonstration   │
│               │       │ Validation     │      │ Analytics       │
└───────────────┘       └────────────────┘      └─────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │   Evidence Explorer   │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     Review Queue      │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │     Methodology       │
                    └───────────────────────┘
```
### Target Architecture
### Supervisory Interface
        ↓
Backend / **API**
        ↓
### Analytics Engine
        ↓
Evidence Mapping + Peer Baselines
        ↓
### Supervisory Signals
        ↓
### Priority Queue
        ↓
### Human Review
Offline & Secure Deployment

The intended production environment is:

On-Premise
    ↓
### Restricted Network
    ↓
Air-Gapped Environment
    ↓
### Local Processing
    ↓
### No External Cloud Dependency

The production system is intended to avoid dependency on:

Public cloud services SaaS analytics External AI APIs Internet-based processing

Security requirements include:

**RBAC** Least-privilege access Encryption Audit logging Network isolation Controlled software updates Evidence access controls ### Blockchain Scope

The current prototype does not implement blockchain.

For the target architecture, a permissioned blockchain layer can be considered for:

Evidence hashes Assessment actions Audit events Integrity verification Tamper-evident supervisory records

A technology such as Hyperledger Fabric can be evaluated for this layer.

Raw **SOC** evidence should not unnecessarily be stored directly on-chain.

Current Prototype vs Production
Area	Current Prototype	Target
Data	Synthetic	Authorized **SOC** evidence
Analytics	Demonstration workflow	Production analytics engine
Backend	Not required	FastAPI
Database	Not implemented	PostgreSQL
Authentication	Prototype	**RBAC** / Keycloak
Audit Layer	Not implemented	Secure audit logging
Blockchain	Not implemented	Permissioned audit layer
Deployment	Browser demo	On-premise / air-gapped
Validation	Demonstration	Expert/manual comparison
### Important Limitations

The current prototype is a demonstration, not a production cybersecurity system.

Current limitations include:

Synthetic demonstration data Uploaded **CSV**/**JSON** files are currently validated for structure Complete production analytics is not yet implemented for arbitrary uploaded datasets Peer baselines are synthetic Production backend is not implemented Production **RBAC** is not implemented Blockchain layer is not implemented Current browser dependencies include external **CDN** resources Production deployment requires security hardening and expert validation

These limitations are intentionally documented to distinguish the prototype from the proposed production architecture.

Roadmap Phase 1 - Prototype

Current functional demonstration using synthetic data.

Phase 2 - Analytics Engine

Implement production-grade rules, baselines, anomaly detection, peer grouping and prioritization.

Phase 3 - Secure Data Layer

Introduce database, storage, **RBAC**, encryption and audit logging.

Phase 4 - Controlled Pilot

Validate the system against authorized **SOC** evidence and expert manual assessment.

Phase 5 - Air-Gapped Deployment

Deploy the validated system inside the required restricted environment.

Phase 6 - Immutable Audit

Introduce a permissioned blockchain layer if required after pilot validation.

## Repository Structure

```text
SAT-SA/
├── README.md
├── prototype/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── synthetic-data/
├── docs/
├── architecture/
├── presentation/
├── demo/
├── LICENSE
└── .gitignore
```

Only synthetic or explicitly authorized data should be included in the repository.

### #Run Locally

Alternatively, the project can be opened using a local VS Code Live Server.

Note: The current prototype references external **CDN** dependencies. A production air-gapped deployment would require all dependencies to be bundled locally.

### Demo Flow

A recommended demonstration path is:

**CSE**-07

→ Execution Gap

→ **ALT**-**70412**

→ Evidence Chain

→ Review Queue

→ Human Assessment

A second example:

**CSE**-03

→ Negative Space

→ **ASSET**-**042**

→ Low Observed Activity

→ Verify Monitoring Coverage

Research & References **SIH26157** - Supervisory Analytics Tool for **SOC** Assessment

National Technical Research Organisation (**NTRO**)

**NIST** Cybersecurity Framework 2.0

[https://[www.nist.gov/publications/nist-cybersecurity-framework-csf-20](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20))

**NIST** SP **800**-**137A**

Assessing Information Security Continuous Monitoring Programs

[https://csrc.nist.gov/pubs/sp/**800**/**137**/a/final](https://csrc.nist.gov/pubs/sp/**800**/**137**/a/final)

**NIST** SP **800**-92

Guide to Computer Security Log Management

[https://csrc.nist.gov/pubs/sp/**800**/92/final](https://csrc.nist.gov/pubs/sp/**800**/92/final)

**NIST** SP **800**-61 Rev. 3

Incident Response Recommendations and Considerations for Cybersecurity Risk Management

[https://csrc.nist.gov/pubs/sp/**800**/61/r3/final](https://csrc.nist.gov/pubs/sp/**800**/61/r3/final)

### Hyperledger Fabric

[https://hyperledger-fabric.readthedocs.io/](https://hyperledger-fabric.readthedocs.io/)

Privacy & Security

Never commit:

Real **SOC** logs Real **CSE** data Classified information Credentials **API** keys Private certificates Passwords Internal infrastructure information Personal or customer information

Use synthetic or explicitly authorized data for development and demonstration.

Status

Prototype - Demonstration Ready

**SAT**-SA currently demonstrates the supervisory analytics workflow using synthetic data.

The next stage is to develop, validate and secure the production analytics engine for controlled deployment.

### Core Message

**ANALYZE** → **DETECT** → **EXPLAIN** → **PRIORITIZE** → **HUMAN** **REVIEW**

**SAT**-SA does not replace the examiner. It helps the examiner decide where evidence deserves attention.