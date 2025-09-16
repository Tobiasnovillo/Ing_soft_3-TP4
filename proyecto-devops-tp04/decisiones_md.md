# Decisiones Técnicas - TP04 Azure DevOps Pipelines 2025

## 📋 Resumen del Proyecto

**Aplicación desarrollada:** Sistema web con frontend React y backend Node.js/Express
**Objetivo:** Implementar pipeline CI en YAML con agente Self-Hosted

## 🏗️ Arquitectura de la Solución

### Stack Tecnológico Elegido
- **Frontend:** React 18.2 + CSS personalizado
- **Backend:** Node.js + Express + Jest para testing
- **Pipeline:** Azure DevOps YAML multi-stage
- **Agente:** Self-Hosted local

### Estructura del Repositorio
```
proyecto-devops/
├── front/                    # Frontend React
│   ├── src/
│   │   ├── App.js           # Componente principal
│   │   ├── App.css          # Estilos
│   │   ├── App.test.js      # Tests
│   │   └── index.js         # Punto de entrada
│   ├── public/
│   │   └── index.html       # HTML base
│   └── package.json         # Dependencias frontend
├── back/                    # Backend API
│   ├── server.js            # Servidor Express
│   ├── server.test.js       # Tests API
│   └── package.json         # Dependencias backend
├── azure-pipelines.yml      # Pipeline CI/CD
└── decisiones.md           # Este archivo
```

## 🎯 Decisiones de Diseño

### 1. Elección del Stack
**¿Por qué React + Node.js?**
- **React:** Framework popular, fácil testing, build optimizado
- **Node.js:** Mismo lenguaje front/back, ecosistema NPM robusto
- **Express:** Minimalista, ideal para APIs REST simples

### 2. Configuración del Pipeline

#### Multi-Stage Design
```yaml
stages:
  - CI (Continuous Integration)
    - BackendBuild (Job)
    - FrontendBuild (Job) 
    - ValidationJob (Job dependiente)
```

**Justificación:**
- **Jobs paralelos:** Backend y Frontend se construyen simultáneamente
- **Validación final:** Confirma éxito de ambos builds
- **Artefactos separados:** Facilita deploy independiente

#### Self-Hosted Agent
**Configuración:**
- Pool: `SelfHosted`
- Agent: `Agent-Local`
- Modo: Servicio Windows

**Ventajas:**
- Control total del entorno
- No limitaciones de tiempo
- Personalización completa
- Costo reducido para desarrollo

### 3. Estrategia de Testing

#### Backend Testing
- **Framework:** Jest + Supertest
- **Cobertura:** Endpoints principales (/health, /users, /)
- **Integración:** Tests incluidos en pipeline

#### Frontend Testing
- **Framework:** React Testing Library + Jest
- **Cobertura:** Componentes principales y renders
- **CI Mode:** `CI=true` para ejecución sin watch

### 4. Gestión de Artefactos

#### Backend Artifacts
```yaml
Contents: |
  **/*
  !node_modules/**/*
  !.git/**/*
```
**Exclusiones:** node_modules (se reconstruye), archivos git

#### Frontend Artifacts
```yaml
SourceFolder: 'front/build'
Contents: '**/*'
```
**Solo build:** Únicamente archivos de producción optimizados

## 🔧 Implementación Técnica

### Triggers del Pipeline
```yaml
trigger:
  branches:
    include: [main, develop]
  paths:
    include: [front/*, back/*, azure-pipelines.yml]
```
**Optimización:** Solo ejecuta si hay cambios relevantes

### Variables de Build
- `buildConfiguration: 'Release'`
- `nodeVersion: '18.x'`

### Manejo de Dependencias
- **npm ci:** Instalación determinística desde package-lock.json
- **Cache implícito:** Azure DevOps cachea node_modules automáticamente

## 🚀 Flujo de Ejecución

### 1. Trigger
Git push a `main` → Pipeline inicia automáticamente

### 2. Checkout
```yaml
- checkout: self
```
Descarga código fuente completo

### 3. Build Paralelo
- **Backend:** Install → Test → Build → Artifact
- **Frontend:** Install → Test → Build → Artifact

### 4. Validación
Job dependiente confirma éxito y publica resumen

## 📊 Métricas y Monitoreo

### Tiempos Esperados
- **Backend Build:** ~2-3 minutos
- **Frontend Build:** ~3-4 minutos
- **Total Pipeline:** ~5-7 minutos

### Artefactos Generados
- `backend-drop`: Código fuente backend (sin node_modules)
- `frontend-drop`: Build de producción React

## 🔄 Mejoras Futuras

### Pipeline Extensions
1. **Stage CD:** Deploy automático a desarrollo/producción
2. **Code Quality:** SonarQube, ESLint en pipeline
3. **Security Scan:** Análisis de vulnerabilidades
4. **Performance Tests:** Lighthouse CI para frontend

### Infraestructura
1. **Múltiples Agents:** Para builds paralelos más rápidos
2. **Containerización:** Docker para entornos consistentes
3. **Helm Charts:** Para deploy a Kubernetes

## ✅ Checklist de Completado

- [x] Self-Hosted Agent configurado como servicio
- [x] Pool `SelfHosted` creado en Azure DevOps
- [x] Repositorio con estructura `/front`, `/back`
- [x] Pipeline YAML multi-stage
- [x] Build frontend con tests
- [x] Build backend con tests
- [x] Publicación de artefactos
- [x] Triggers automáticos en main
- [x] Documentación técnica
- [x] Evidencias de ejecución

## 🎓 Aprendizajes Clave

1. **Agentes Self-Hosted** ofrecen flexibilidad total
2. **Jobs paralelos** optimizan tiempo de build
3. **Artefactos separados** facilitan deploy granular
4. **Testing en CI** garantiza calidad de código
5. **YAML Pipelines** son más mantenibles que GUI

---
**Autor:** [Tu Nombre]  
**Fecha:** Septiembre 2025  
**Curso:** DevOps - Azure Pipelines  
**TP:** 04 - CI Pipeline Self-Hosted