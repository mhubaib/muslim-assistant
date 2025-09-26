import { Platform } from 'react-native';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocationService {
    static async requestLocationPermission() {
        try {
            const permission = Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

            const result = await request(permission);

            if (result === RESULTS.GRANTED) {
                await AsyncStorage.setItem('locationPermissionGranted', 'true');
                return { success: true, granted: true };
            }

            return { success: false, granted: false, reason: 'Permission denied' };
        } catch (error) {
            return { success: false, granted: false, reason: error.message };
        }
    }

    static async checkLocationPermission() {
        try {
            const permission = Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

            const result = await check(permission);
            return result === RESULTS.GRANTED;
        } catch (error) {
            return false;
        }
    }

    static getCurrentLocation() {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => reject(error),
                { enableHighAccuracy: true, timeout: 15000 }
            );
        });
    }
}

export default LocationService;