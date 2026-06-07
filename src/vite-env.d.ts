/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Klucz Web3Forms — leady wysyłane prosto na e-mail. */
  readonly VITE_WEB3FORMS_KEY?: string
  /** Webhook (n8n / Make / własny endpoint), na który wysyłane są leady. */
  readonly VITE_LEAD_WEBHOOK_URL?: string
  /** Numer WhatsApp w formacie międzynarodowym bez znaków (np. 48512491787). */
  readonly VITE_WHATSAPP?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
