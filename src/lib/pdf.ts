/**
 * Generowanie spersonalizowanego PDF „Wstępna analiza oszczędności" (wariant teaser).
 * pdfmake ładowane dynamicznie (nie obciąża startu strony). Polskie znaki: czcionka
 * Roboto z paczki pdfmake. Auto-mail z PDF — w fazie n8n (dane są już w leadzie).
 */
import { VOIVODESHIPS, type CalcInput, type CalcResult } from './calc'

const INK = '#0a1018'
const GOLD = '#c8951a'
const GOLD_SOFT = '#faf6ea'
const GOLD_LT = '#f3e6c0'
const TEXT = '#22303f'
const MUTED = '#5b6b7a'
const LINE = '#e6ebf0'

const plnum = (n: number, dec = 0) =>
  n.toLocaleString('pl-PL', { minimumFractionDigits: dec, maximumFractionDigits: dec })

const OBJ: Record<string, string> = {
  dom: 'Dom jednorodzinny',
  firma: 'Firma',
  rolne: 'Gospodarstwo rolne',
}

export async function generateWycenaPdf(
  input: CalcInput,
  result: CalcResult,
  name: string,
): Promise<void> {
  const [pdfMod, vfsMod] = await Promise.all([
    import('pdfmake/build/pdfmake'),
    import('pdfmake/build/vfs_fonts'),
  ])
  const pdfMake: any = (pdfMod as any).default ?? pdfMod
  const v: any = (vfsMod as any).default ?? vfsMod
  pdfMake.vfs = v.pdfMake?.vfs ?? v.vfs ?? v

  const date = new Date().toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })
  const woj = VOIVODESHIPS.find((w) => w.value === input.voivodeship)?.label ?? input.voivodeship

  const extras: string[] = []
  if (input.dynamicTariff) extras.push('taryfa dynamiczna')
  if (input.heatPump) extras.push('pompa ciepła')
  if (input.ev) extras.push('samochód elektryczny')
  if (input.ac) extras.push('klimatyzacja')

  const rachunek =
    input.annualConsumption > 0 && input.monthlyBill <= 0
      ? `${plnum(input.annualConsumption)} kWh / rok`
      : `${plnum(input.monthlyBill)} zł / mies.`

  const statBox = (value: string, label: string) => ({
    width: '*',
    table: {
      widths: ['*'],
      body: [
        [
          {
            stack: [
              { text: value, color: GOLD, bold: true, fontSize: 16, alignment: 'center' },
              { text: label, color: MUTED, fontSize: 8, alignment: 'center', margin: [0, 3, 0, 0] },
            ],
            margin: [4, 10, 4, 10],
          },
        ],
      ],
    },
    layout: { fillColor: () => GOLD_SOFT, hLineWidth: () => 0, vLineWidth: () => 0 },
  })

  const kv = (rows: [string, string][]) => ({
    table: {
      widths: ['*', 'auto'],
      body: rows.map(([k, val]) => [
        { text: k, color: MUTED, fontSize: 9.5, margin: [0, 3, 0, 3] },
        { text: val, color: INK, bold: true, fontSize: 9.5, alignment: 'right', margin: [0, 3, 0, 3] },
      ]),
    },
    layout: 'noBorders',
    margin: [0, 2, 0, 8],
  })

  const sectionTitle = (t: string) => [
    { text: t, color: INK, bold: true, fontSize: 12, margin: [0, 12, 0, 4] },
    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: LINE }], margin: [0, 0, 0, 8] },
  ]

  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      // Pasek nagłówka
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                columns: [
                  {
                    width: 'auto',
                    table: { body: [[{ text: 'KB', color: INK, bold: true, fontSize: 15, margin: [7, 7, 7, 7] }]] },
                    layout: { fillColor: () => GOLD, hLineWidth: () => 0, vLineWidth: () => 0 },
                  },
                  {
                    width: '*',
                    margin: [12, 4, 0, 0],
                    stack: [
                      { text: 'Kamil Bronisz', color: '#ffffff', bold: true, fontSize: 14 },
                      { text: 'Konsultant energetyczny', color: GOLD_LT, fontSize: 9 },
                    ],
                  },
                  {
                    width: 'auto',
                    alignment: 'right',
                    fontSize: 8,
                    color: '#c9d2db',
                    margin: [0, 4, 0, 0],
                    stack: [
                      { text: 'tel. 512 491 787' },
                      { text: 'kamil.bronisz@begolden.com.pl' },
                      { text: 'Lublin · ' + date },
                    ],
                  },
                ],
                fillColor: INK,
                margin: [16, 14, 16, 14],
              },
            ],
          ],
        },
        layout: 'noBorders',
      },

      { text: 'Wstępna analiza oszczędności', color: INK, bold: true, fontSize: 18, margin: [0, 18, 0, 2] },
      { text: 'Przygotowano dla: ' + (name || '—'), color: MUTED, fontSize: 11, margin: [0, 0, 0, 4] },

      ...sectionTitle('Twoje dane wejściowe'),
      kv([
        ['Rodzaj obiektu', OBJ[input.objectType] ?? input.objectType],
        ['Województwo', woj],
        ['Miesięczny rachunek', rachunek],
        ['Uwzględniono', extras.join(', ') || '—'],
      ]),

      ...sectionTitle('Rekomendowany system'),
      {
        columns: [
          statBox(plnum(result.pvPowerKwp, result.pvPowerKwp % 1 ? 1 : 0) + ' kWp', 'Moc instalacji PV'),
          statBox(plnum(result.storageKwh) + ' kWh', 'Magazyn energii'),
          statBox(Math.round(result.selfConsumption * 100) + '%', 'Autokonsumpcja'),
        ],
        columnGap: 10,
        margin: [0, 0, 0, 4],
      },

      ...sectionTitle('Twoje oszczędności i zwrot'),
      {
        columns: [
          statBox(plnum(result.annualSavings) + ' zł', 'Roczne oszczędności'),
          statBox(Math.round(result.billReduction * 100) + '%', 'Niższy rachunek'),
          statBox(plnum(result.paybackYears, 1) + ' lat', 'Zwrot po dotacji'),
        ],
        columnGap: 10,
        margin: [0, 0, 0, 6],
      },
      kv([
        ['Skumulowane oszczędności w 10 lat', plnum(result.savings10y) + ' zł'],
        ['Skumulowane oszczędności w 20 lat', plnum(result.savings20y) + ' zł'],
        ['Redukcja CO2', plnum(result.co2PerYear) + ' kg / rok'],
      ]),

      // Dotacja
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                stack: [
                  { text: 'Dotacja 2026: do 16 000 zł', color: INK, bold: true, fontSize: 11 },
                  {
                    text: 'Program „Przydomowe Magazyny Energii" — wymaga systemu zarządzania energią (EMS) i pracy wyspowej. Dobieram rozwiązania, które te wymogi spełniają.',
                    color: TEXT,
                    fontSize: 9,
                    margin: [0, 4, 0, 0],
                  },
                ],
                margin: [14, 10, 14, 10],
              },
            ],
          ],
        },
        layout: {
          fillColor: () => '#fff8e6',
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#e7c97a',
          vLineColor: () => '#e7c97a',
        },
        margin: [0, 8, 0, 4],
      },

      ...sectionTitle('Co ustalimy na bezpłatnej 15-min rozmowie'),
      {
        ul: [
          'Dokładny dobór systemu i konkretną cenę — po sprawdzeniu dachu, przyłącza i realnego profilu zużycia.',
          'Pewność kwalifikacji do dotacji i pomoc w formalnościach.',
          'Harmonogram montażu oraz opcje finansowania.',
        ],
        color: TEXT,
        fontSize: 10,
        lineHeight: 1.3,
        margin: [0, 0, 0, 12],
      },

      // CTA
      {
        table: {
          widths: ['*'],
          body: [
            [
              {
                stack: [
                  { text: 'Następny krok: zarezerwuj bezpłatną 15-min rozmowę', color: '#ffffff', bold: true, fontSize: 12 },
                  {
                    text: 'tel. 512 491 787 · kamil.bronisz@begolden.com.pl · kamilbronisz.pl',
                    color: GOLD_LT,
                    fontSize: 8.5,
                    margin: [0, 4, 0, 0],
                  },
                ],
                margin: [16, 12, 16, 12],
              },
            ],
          ],
        },
        layout: { fillColor: () => INK, hLineWidth: () => 0, vLineWidth: () => 0 },
      },
    ],
    footer: () => ({
      text: 'Wyniki orientacyjne; dokładna wycena na bezpłatnej analizie. Założenia z dnia ' + date + '.',
      alignment: 'center',
      color: MUTED,
      fontSize: 7,
      margin: [40, 12, 40, 0],
    }),
    defaultStyle: { fontSize: 10, color: TEXT, lineHeight: 1.25 },
  }

  const fileName = `wycena-magazyn-energii-${new Date().toISOString().slice(0, 10)}.pdf`
  pdfMake.createPdf(docDefinition).download(fileName)
}
