import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';

const DeviceInfoScreen = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [wifiStatus, setWifiStatus] = useState(null);
  const [gpsStatus, setGpsStatus] = useState(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const apiLevel = await DeviceInfo.getApiLevel();
      const versionName = await DeviceInfo.getVersion();
      const applicationId = await DeviceInfo.getBundleId();
      const deviceModel = await DeviceInfo.getModel();
      const deviceVersion = await DeviceInfo.getSystemVersion();
      const androidVersion = await DeviceInfo.getAndroidId();
      const totalMemory = await DeviceInfo.getTotalMemory();
      const freeMemory = await DeviceInfo.getUsedMemory();
      const totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
      const freeDiskStorage = await DeviceInfo.getFreeDiskStorage();

      setDeviceInfo({
        apiLevel,
        versionName,
        applicationId,
        deviceModel,
        deviceVersion,
        androidVersion,
        totalMemory,
        freeMemory,
        totalDiskCapacity,
        freeDiskStorage,
      });
    };

    const fetchBatteryLevel = async () => {
      const batteryLevel = await DeviceInfo.getBatteryLevel();
      setBatteryLevel(batteryLevel);
    };

    const fetchWifiStatus = async () => {
      const { type } = await NetInfo.fetch();
      setWifiStatus(type === 'wifi');
    };

    const fetchGpsStatus = async () => {
      const isGpsEnabled = await DeviceInfo.isLocationEnabled();
      setGpsStatus(isGpsEnabled);
    };

    fetchDeviceInfo();
    fetchBatteryLevel();
    fetchWifiStatus();
    fetchGpsStatus();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {deviceInfo && (
        <View>
          <Text style={styles.label}>API URL:</Text>
          <Text style={styles.info}>Insertar aquí el valor de la API URL</Text>

          <Text style={styles.label}>Version Name:</Text>
          <Text style={styles.info}>{deviceInfo.versionName}</Text>

          <Text style={styles.label}>Application ID:</Text>
          <Text style={styles.info}>{deviceInfo.applicationId}</Text>

          <Text style={styles.label}>Modelo del Teléfono:</Text>
          <Text style={styles.info}>{deviceInfo.deviceModel}</Text>

          <Text style={styles.label}>Versión de Android:</Text>
          <Text style={styles.info}>{deviceInfo.androidVersion}</Text>

          <Text style={styles.label}>Memoria Total (RAM):</Text>
          <Text style={styles.info}>{(deviceInfo.totalMemory / (1024 * 1024)).toFixed(2)} MB</Text>

          <Text style={styles.label}>Memoria Disponible (RAM):</Text>
          <Text style={styles.info}>{(deviceInfo.freeMemory / (1024 * 1024)).toFixed(2)} MB</Text>

          <Text style={styles.label}>Capacidad Total de Almacenamiento:</Text>
          <Text style={styles.info}>{(deviceInfo.totalDiskCapacity / (1024 * 1024 * 1024)).toFixed(2)} GB</Text>

          <Text style={styles.label}>Almacenamiento Disponible:</Text>
          <Text style={styles.info}>{(deviceInfo.freeDiskStorage / (1024 * 1024 * 1024)).toFixed(2)} GB</Text>

          <Text style={styles.label}>Nivel de Batería:</Text>
          <Text style={styles.info}>{batteryLevel}</Text>

          <Text style={styles.label}>Conexión Wi-Fi:</Text>
          <Text style={styles.info}>{wifiStatus ? 'Conectado' : 'No Conectado'}</Text>

          <Text style={styles.label}>Estado del GPS:</Text>
          <Text style={styles.info}>{gpsStatus ? 'Prendido' : 'Apagado'}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DeviceInfoScreen;
