import { Platform } from "react-native";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LocationService {
    static getPermissionKey() {
        return Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    }

    static async requestLocationPermission() {
        try {
            const permission = this.getPermissionKey();
            const result = await request(permission);

            const granted = result === RESULTS.GRANTED;
            if (granted) {
                await AsyncStorage.setItem("locationPermissionGranted", "true");
            }

            return {
                success: granted,
                granted,
                reason: granted ? null : "Permission denied",
            };
        } catch (error) {
            return {
                success: false,
                granted: false,
                reason: error.message || "Unknown error",
            };
        }
    }

    static async checkLocationPermission() {
        try {
            const permission = this.getPermissionKey();
            const result = await check(permission);
            return result === RESULTS.GRANTED;
        } catch {
            return false;
        }
    }

    static async getCurrentLocation() {
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
