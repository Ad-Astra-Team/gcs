export const metro = {
	name: 'metro-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '4px',
		'--theme-rounded-container': '6px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '255 255 255',
		'--on-success': '255 255 255',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #0d1117
		'--color-primary-50': '219 219 220', // #dbdbdc
		'--color-primary-100': '207 207 209', // #cfcfd1
		'--color-primary-200': '195 196 197', // #c3c4c5
		'--color-primary-300': '158 160 162', // #9ea0a2
		'--color-primary-400': '86 88 93', // #56585d
		'--color-primary-500': '13 17 23', // #0d1117
		'--color-primary-600': '12 15 21', // #0c0f15
		'--color-primary-700': '10 13 17', // #0a0d11
		'--color-primary-800': '8 10 14', // #080a0e
		'--color-primary-900': '6 8 11', // #06080b
		// secondary | #656161
		'--color-secondary-50': '232 231 231', // #e8e7e7
		'--color-secondary-100': '224 223 223', // #e0dfdf
		'--color-secondary-200': '217 216 216', // #d9d8d8
		'--color-secondary-300': '193 192 192', // #c1c0c0
		'--color-secondary-400': '147 144 144', // #939090
		'--color-secondary-500': '101 97 97', // #656161
		'--color-secondary-600': '91 87 87', // #5b5757
		'--color-secondary-700': '76 73 73', // #4c4949
		'--color-secondary-800': '61 58 58', // #3d3a3a
		'--color-secondary-900': '49 48 48', // #313030
		// tertiary | #5a27dd
		'--color-tertiary-50': '230 223 250', // #e6dffa
		'--color-tertiary-100': '222 212 248', // #ded4f8
		'--color-tertiary-200': '214 201 247', // #d6c9f7
		'--color-tertiary-300': '189 169 241', // #bda9f1
		'--color-tertiary-400': '140 104 231', // #8c68e7
		'--color-tertiary-500': '90 39 221', // #5a27dd
		'--color-tertiary-600': '81 35 199', // #5123c7
		'--color-tertiary-700': '68 29 166', // #441da6
		'--color-tertiary-800': '54 23 133', // #361785
		'--color-tertiary-900': '44 19 108', // #2c136c
		// success | #1d9f35
		'--color-success-50': '221 241 225', // #ddf1e1
		'--color-success-100': '210 236 215', // #d2ecd7
		'--color-success-200': '199 231 205', // #c7e7cd
		'--color-success-300': '165 217 174', // #a5d9ae
		'--color-success-400': '97 188 114', // #61bc72
		'--color-success-500': '29 159 53', // #1d9f35
		'--color-success-600': '26 143 48', // #1a8f30
		'--color-success-700': '22 119 40', // #167728
		'--color-success-800': '17 95 32', // #115f20
		'--color-success-900': '14 78 26', // #0e4e1a
		// warning | #d4bb16
		'--color-warning-50': '249 245 220', // #f9f5dc
		'--color-warning-100': '246 241 208', // #f6f1d0
		'--color-warning-200': '244 238 197', // #f4eec5
		'--color-warning-300': '238 228 162', // #eee4a2
		'--color-warning-400': '225 207 92', // #e1cf5c
		'--color-warning-500': '212 187 22', // #d4bb16
		'--color-warning-600': '191 168 20', // #bfa814
		'--color-warning-700': '159 140 17', // #9f8c11
		'--color-warning-800': '127 112 13', // #7f700d
		'--color-warning-900': '104 92 11', // #685c0b
		// error | #a30b00
		'--color-error-50': '241 218 217', // #f1dad9
		'--color-error-100': '237 206 204', // #edcecc
		'--color-error-200': '232 194 191', // #e8c2bf
		'--color-error-300': '218 157 153', // #da9d99
		'--color-error-400': '191 84 77', // #bf544d
		'--color-error-500': '163 11 0', // #a30b00
		'--color-error-600': '147 10 0', // #930a00
		'--color-error-700': '122 8 0', // #7a0800
		'--color-error-800': '98 7 0', // #620700
		'--color-error-900': '80 5 0', // #500500
		// surface | #22252a
		'--color-surface-50': '222 222 223', // #dededf
		'--color-surface-100': '211 211 212', // #d3d3d4
		'--color-surface-200': '200 201 202', // #c8c9ca
		'--color-surface-300': '167 168 170', // #a7a8aa
		'--color-surface-400': '100 102 106', // #64666a
		'--color-surface-500': '34 37 42', // #22252a
		'--color-surface-600': '31 33 38', // #1f2126
		'--color-surface-700': '26 28 32', // #1a1c20
		'--color-surface-800': '20 22 25', // #141619
		'--color-surface-900': '17 18 21' // #111215
	}
};
