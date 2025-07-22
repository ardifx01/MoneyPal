# MoneyPal - Daily Expense Tracker

A comprehensive React Native application for tracking daily expenses, income, and managing personal finances with a clean, intuitive interface.

## Features

### 📅 Date Picker
- Interactive date picker at the top of the screen
- Shows current selected date in a readable format
- Tap to change date and view transactions for different days
- Automatically updates the transaction list when date changes

### 💰 Transaction Management
- Add new transactions (income or expenses) with enhanced features
- **Calculator Integration**: Full numeric keypad for precise amount entry
- **Category System**: Predefined categories with icons and colors
  - **Expense Categories**: Food & Dining, Transportation, Shopping, Entertainment, Health & Medical, Education, Bills & Utilities, Clothes, Laundry, Home & Garden, Personal Care, Other
  - **Income Categories**: Salary, Freelance, Investment, Gift, Refund, Other
- **Description Support**: Optional text descriptions for transactions
- **Image Attachments**: Add photos to transactions for receipts or documentation
- View all transactions for the selected date with rich details
- Delete transactions with confirmation
- Different styling for income (green) and expenses (red)
- Currency formatting for all amounts

### 🏦 Budget Management
- Set monthly budget limits for overall spending and for each expense category
- Visual progress bars show how much of each budget is used
- When a budget is reached, a red warning and red progress bar appear for clear feedback

### 📊 Daily Summary
- Real-time calculation of daily totals
- Shows total income, total expenses, and net balance
- Color-coded balance (green for positive, red for negative)
- Clean card-based design

### 💾 Persistent Storage
- All data stored locally using AsyncStorage
- Data persists between app sessions
- No internet connection required

### 🎨 Modern UI/UX
- Clean, modern design with proper spacing
- Responsive layout for both Android and iOS
- Smooth animations and transitions
- Intuitive navigation and interactions
- Rich visual feedback with category icons and colors

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **AsyncStorage** for local data persistence
- **@react-native-community/datetimepicker** for date selection
- **expo-image-picker** for image selection
- **React Navigation** (via Expo Router)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
-Android Emulator (or physical device)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TestPembelianNote
```

2. Install dependencies:
```bash
npm install
```

3. Run on your preferred platform:
```bash
npm expo run:android
```

## Project Structure

```
app/
├── components/
│   ├── DatePicker.tsx          # Date selection component
│   ├── TransactionItem.tsx     # Individual transaction display
│   ├── Summary.tsx             # Daily summary card
│   ├── AddTransactionModal.tsx # Add transaction modal
│   ├── Calculator.tsx          # Numeric calculator for amounts
│   └── CategoryPicker.tsx      # Category selection modal
├── utils/
│   ├── storage.ts              # AsyncStorage utilities
│   ├── dateUtils.ts            # Date formatting utilities
│   └── categories.ts           # Category definitions and utilities
├── types.ts                    # TypeScript type definitions
├── _layout.tsx                 # App layout configuration
└── index.tsx                   # Main app screen
```

## Usage

1. **View Transactions**: The app opens to today's date by default, showing all transactions for that day.

2. **Change Date**: Tap the date at the top to open the date picker and select a different date.

3. **Add Transaction**: Tap the floating "+" button to open the add transaction modal with enhanced features:
   - **Title**: Enter a descriptive title for the transaction
   - **Amount**: Tap to open a full calculator for precise amount entry
   - **Type**: Choose between Income or Expense
   - **Category**: Select from predefined categories with visual icons
   - **Description**: Add optional notes or details
   - **Image**: Attach photos (receipts, documents, etc.)
   - **Date**: Choose the transaction date

4. **Delete Transaction**: Tap the "×" button on any transaction to delete it (with confirmation).

5. **View Summary**: The daily summary is always visible, showing income, expenses, and net balance.

## Features in Detail

### Calculator Component
- Full numeric keypad with decimal support
- Real-time amount formatting
- Clear and delete functionality
- Modal presentation for easy access

### Category System
- Visual category selection with icons and colors
- Separate categories for income and expenses
- Easy category switching when changing transaction type
- Category display in transaction list

### Image Support
- Photo library access for image selection
- Image editing and cropping
- Optional image attachments for transactions
- Image display in transaction list
- Permission handling for photo access

### Enhanced Transaction Display
- Category icons and names
- Optional description text
- Transaction images (if attached)
- Improved layout for rich information

### Data Persistence
- All transactions stored locally using AsyncStorage
- Automatic data loading on app startup
- Efficient filtering by date
- Complete transaction data including images and descriptions

### UI/UX Design
- Consistent color scheme throughout the app
- Proper spacing and typography
- Responsive design for different screen sizes
- Accessibility considerations
- Rich visual feedback with category colors and icons

### Budget Limit Warnings
- Set monthly limits for overall and per-category spending
- Progress bars visually indicate usage for each budget
- When spending reaches or exceeds a limit, the progress bar turns red and a red warning message "Amount has reached the limit" is displayed
- Helps you stay on track and avoid overspending

## Permissions

The app requires the following permissions:
- **Photo Library Access**: To add images to transactions
- **Storage Access**: For saving and retrieving transaction data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
