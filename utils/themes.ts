export interface WarnaTema {
    linearGradientBackground: readonly [string, string, ...string[]],
    primary: string,
    card: string,
    bar: string,
    text: string, 
    textSecondary: string, 
    lightTextSecondary: string, 
    textColorInBackground: string,
    success: string, 
    danger: string, 
    divider: string,
    transactionIncomeGradient: readonly [string, string],
    transactionExpenseGradient: readonly [string, string],
}

export const lightTheme: WarnaTema = {
    linearGradientBackground: ["#f8f9fa", "#e3f2fd", "#f8f9fa"] as const,
    primary: '#007bff',
    card: "#ffffff", // pure white for card
    bar: '#e3f2fd', // light blue for top bar
    text: '#232b3b', // deep blue-gray for main text
    textColorInBackground: "#fff",
    textSecondary: '#6c757d', // muted gray for secondary text
    lightTextSecondary: "#bbdefb",
    success: '#28a745', // green for income
    danger: '#dc3545', // red for expense
    divider: '#e9ecef', // subtle divider
    transactionIncomeGradient: ['#c6f7e2', '#e0f9f1'], // fresher green gradient
    transactionExpenseGradient: ['#ffe0e0', '#fff5f5'], // fresher red gradient
}

export const darkTheme: WarnaTema = {
    linearGradientBackground: ["#181c24", "#232b3b", "#181c24"] as const, // deep blue-grays
    primary: "#339cff", // vivid blue
    card: "#2d3648", // lighter card/surface background
    bar: '#bababa',
    text: "#f1f3f4", // main text
    textSecondary: "#b0b8c1", // secondary text
    lightTextSecondary: "#b0b8c1", // secondary text
    textColorInBackground: "#f1f3f4",
    success: "#3ddc97", // teal-green
    danger: "#ff6b81", // soft red
    divider: "#2c3442", // for borders/dividers
    transactionIncomeGradient: ['#3ad29f', '#5eead4'], // brighter green gradient
    transactionExpenseGradient: ['#ffb4b4', '#ff7676'], // brighter red gradient
}