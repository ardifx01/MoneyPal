import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { dateUtils } from '../../utils/dateUtils';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, date?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (date) {
      onDateChange(date);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateText}>{dateUtils.formatDateForDisplay(selectedDate)}</Text>
        <Text style={styles.tapText}>Tap to change date</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          style={styles.picker}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  dateButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  tapText: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  picker: {
    width: Platform.OS === 'ios' ? '100%' : 0,
    height: Platform.OS === 'ios' ? 200 : 0,
  },
}); 