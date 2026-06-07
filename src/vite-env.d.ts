/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Klucz Web3Forms — leady wysyłane prosto na e-mail. */
  readonly VITE_WEB3FORMS_KEY?: string
  /** Webhook (n8n / Make / własny endpoint), na który wysyłane są leady. */
  readonly VITE_LEAD_WEBHOOK_URL?: string
  /** Numer WhatsApp w formacie międzynarodowym bez znaków (np. 48512491787). */
  readonly VITE_WHATSAPP?: string
  /** Google Tag Manager — ID kontenera (np. GTM-XXXXXXX). */
  readonly VITE_GTM_ID?: string
  /** Meta (Facebook) Pixel — ID piksela (np. 1234567890). */
  readonly VITE_META_PIXEL_ID?: string
  /** Google Ads — ID konta (np. AW-XXXXXXXXX). */
  readonly VITE_GADS_ID?: string
  /** Google Ads — etykieta konwersji (część po „/" w send_to). */
  readonly VITE_GADS_CONVERSION_LABEL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'pdfmake/build/pdfmake'
declare module 'pdfmake/build/vfs_fonts'
