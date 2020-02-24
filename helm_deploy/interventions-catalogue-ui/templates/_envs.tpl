{{/* vim: set filetype=mustache: */}}
{{/*
Environment variables for web and worker containers
*/}}
{{- define "deployment.envs" }}
env:
  - name: API_CLIENT_ID
    valueFrom:
      secretKeyRef:
        name: {{ template "app.name" . }}
        key: API_CLIENT_ID

  - name: API_CLIENT_SECRET
    valueFrom:
      secretKeyRef:
        name: {{ template "app.name" . }}
        key: API_CLIENT_SECRET

  - name: NOMIS_AUTH_URL
    value: {{ .Values.env.NOMIS_AUTH_URL | quote }}

  - name: NOMIS_OAUTH_PUBLIC_KEY
    value: {{ .Values.env.NOMIS_OAUTH_PUBLIC_KEY | quote }}

  - name: INGRESS_URL
    value: 'https://{{ .Values.ingress.host }}'
  
  - name: EXIT_LOCATION_URL
    value: {{ .Values.env.EXIT_LOCATION_URL | quote }}
{{- end -}}
