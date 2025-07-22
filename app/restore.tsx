import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useBudget } from '@/hooks/useBudget';
import { useKategori } from '@/hooks/useCategory';
import { useMataUang, useNotifikasi } from '@/hooks/usePreference';
import { useTransactions } from '@/hooks/useTransactions';
import { Category, MataUang, TipeBudget, Transaction } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { types as DocumentPickerTypes, pick } from '@react-native-documents/picker';
import RNFS from 'react-native-fs';
import HeaderAplikasi from './components/HeaderAplikasi';

export default function Restore() {
  const { mataUang, ganti: gantiMataUang } = useMataUang();
  const { opsi: opsiNotifikasi, waktu: waktuNotifikasi, ganti: gantiNotifikasi } = useNotifikasi();
  const { simpan: simpanBudget, hapusSemuaBudget } = useBudget();
  const { tambah: tambahTransaction, hapusSemua: hapusSemuaTransaction } = useTransactions();
  const { simpan: simpanKategori, hapusSemua: hapusSemuaKategori } = useKategori();
  const [isRestoring, setIsRestoring] = useState(false);
  const [parsedData, setParsedData] = useState<{ transactions: Transaction[], categories: Category[], images: Record<string, string>, budget: TipeBudget, preference: { mataUang: MataUang, notifikasi: { opsi: boolean, waktu: { hour: number, minute: number } } }, backupCreatedAt: string, version: number} | null>(null);

  const handlePickFile = async () => {
    try {
      const [ res ] = await pick({ type: [DocumentPickerTypes.allFiles] });
      if (!res || !res.uri) return;

      const fileContent = await RNFS.readFile(res.uri.replace('file://', ''), 'utf8');
      let data;
      try {
        data = JSON.parse(fileContent);
      } catch (e) {
        Alert.alert('Invalid File', 'The selected file is not a valid JSON backup.');
        return;
      }
      // Validate structure
      if (!data.transactions || !data.categories || !data.images || !data.version) {
        Alert.alert('Invalid Backup', 'The selected file is not a valid MoneyPal backup.');
        return;
      }

      setParsedData(data);
      Alert.alert('Backup Loaded', 'Backup file loaded and ready to restore.');
    } catch (e: any) {
        console.log(e, "ERROR SAAT PICKING FILE");
        Alert.alert('Error', 'Failed to pick file.');
    }
  };

  const handleRestore = async () => {
    if (!parsedData) return;

    setIsRestoring(true);
    try {
      const imageUriMap: Record<string, string> = {}; // oldUri -> newUri
      for (const [oldUri, base64] of Object.entries(parsedData.images || {})) {
        const ext = oldUri.split('.').pop() || 'jpg';
        const newUri = `${RNFS.DocumentDirectoryPath}/restored_${Date.now()}_${Math.floor(Math.random()*10000)}.${ext}`;
        await RNFS.writeFile(newUri, base64 as string, 'base64');
        imageUriMap[oldUri] = 'file://' + newUri;
      }

      await gantiMataUang(parsedData.preference.mataUang.symbol);
      await gantiNotifikasi(parsedData.preference.notifikasi.opsi, parsedData.preference.notifikasi.waktu);

      await hapusSemuaBudget();
      await simpanBudget(parsedData.budget);

      await hapusSemuaKategori(); // clear and reload
      for (const cat of parsedData.categories) {
        await simpanKategori(cat);
      }
      await hapusSemuaTransaction();
      for (const t of parsedData.transactions) {
        const newT = { ...t };
        if (newT.imageUri && imageUriMap[newT.imageUri]) {
          newT.imageUri = imageUriMap[newT.imageUri];
        }
        await tambahTransaction(newT);
      }
      Alert.alert('Restore Successful', 'All data has been restored!');
      setParsedData(null);
    } catch (e: any) {
      Alert.alert('Restore Failed', `Could not restore data. Please try again. ${e}`);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <LinearGradient colors={["#f8f9fa", "#e3f2fd", "#f8f9fa"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header with Back Button */}
        <HeaderAplikasi subtitle='Restore Data' pageUtama={false} icon='cloud-download-outline' />

        <View style={styles.centered}>
          <View style={styles.card}>
            <View style={styles.iconCircle}>
              <Ionicons name="cloud-download-outline" size={44} color="#0984e3" />
            </View>
            <Text style={styles.title}>Restore Your Data</Text>
            <Text style={styles.desc}>
              Select a backup file to restore all your transactions, custom categories, and images. Only valid MoneyPal backup files are accepted.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handlePickFile}
              disabled={isRestoring}
            >
              <Ionicons name="folder-open-outline" size={22} color="#fff" />
              <Text style={styles.buttonText}>Choose Backup File</Text>
            </TouchableOpacity>
            {parsedData && (
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Backup Summary</Text>
                <Text style={styles.summaryText}>Total Transactions: {parsedData.transactions.length}</Text>
                <Text style={styles.summaryText}>Categories: {parsedData.categories.length}</Text>
                <Text style={styles.summaryText}>Total Budgets: {Object.keys(parsedData.budget.budget).length}</Text>
                <Text style={styles.summaryText}>Images: {Object.keys(parsedData.images).length}</Text>
                <Text style={styles.summaryText}>Currency: {parsedData.preference.mataUang.name ?? "US Dollar"}</Text>
                <TouchableOpacity
                  style={[styles.button, isRestoring && styles.buttonDisabled, { marginTop: 18 }]}
                  onPress={handleRestore}
                  disabled={isRestoring}
                >
                  <Ionicons name={isRestoring ? 'hourglass-outline' : 'cloud-download-outline'} size={22} color="#fff" />
                  <Text style={styles.buttonText}>{isRestoring ? 'Restoring...' : 'Restore Now'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#90caf9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e3f2fd',
    width: 340,
    maxWidth: '100%',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e3f0fc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    fontSize: 15,
    color: '#495057',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 22,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0984e3',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: '#0984e3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#b2bec3',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 12,
  },
  summaryBox: {
    marginTop: 24,
    backgroundColor: '#f1f3f4',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    alignItems: 'center',
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1976d2',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 2,
  },
});