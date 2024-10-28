// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      ellipsis: 'truncate',
      hover: 'cursor-pointer op100 hover:op70 transition-all',
      divider: 'border-b border-base',
      'flex-col': 'flex flex-col',
      'border-base': 'border-gray-500:20',
      'flex-center': 'flex justify-center items-center'
    }
  ],
  rules: [
    ['bg-fff', { background: '#fff' }],
    ['cl-fff', { color: '#fff' }],
    ['cl-333', { color: '#333' }],
    ['cl-666', { color: '#666' }],
    ['cl-999', { color: '#999' }],
    ['cl-red', { color: '#c80505' }],
    ['cl-blue', { color: '#409eff' }],
    ['ft-12', { 'font-size': '12px' }],
    ['ft-14', { 'font-size': '14px' }],
    ['ft-16', { 'font-size': '16px' }],
    ['ft-18', { 'font-size': '18px' }],
    ['ft-24', { 'font-size': '24px' }],
    ['shadow', { 'box-shadow': '0px 2px 12px 0 rgba(0, 0, 0, .1)' }]
  ],
  theme: {
    colors: {
      primary: 'var(--main-color)',
      success: 'var(--van-green)',
      warning: 'var(--van-orange)',
      danger: 'var(--van-red)'
    }
  },
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerVariantGroup(), transformerDirectives()]
})
