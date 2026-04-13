import { HackclubProvider } from '@ridit/hackclub-ai-sdk'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

const ai = new HackclubProvider(process.env.HACKCLUB_API_KEY!)

const dir = join(process.cwd(), 'resources/cat-pack')

const files = readdirSync(dir).filter((f) => f.endsWith('.jpg') || f.endsWith('.png'))

;(async () => {
  for (const file of files) {
    try {
      const filePath = join(dir, file)

      const base64 = readFileSync(filePath).toString('base64')

      const result = await ai.removeBg(
        `data:image/jpeg;base64,${base64}`,
        '851-labs/background-remover',
        {
          save: true,
          filename: `clean-${file.replace(/\.(jpg|png)$/, '.png')}`
        }
      )

      console.log('done:', file, '→', result)
    } catch (err) {
      console.error('failed:', file, err)
    }
  }
})()
