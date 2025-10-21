# OBS Dash

## Development

1. Create from template

   ```bash
   pnpx create-expo-app@latest
   ```

2. Install Expo Go
   
   Go to Play Store and search for `Expo Go`.

3. Run dev server

   ```bash
   pnpx start
   ```

4. Scan QR code using Expo Go app

   Make changes to `app/(tabs)/index.tsx` and observe changes in Expo Go.

## Build

1. Install Android Studio on WSL Linux side

   ```bash
   yay -S android-studio
   ```


2. Install OpenJDK

   ```bash
   pacman -S jdk17-openjdk
   ```


3. Open up `android-studio` in WSL 

   The GUI should fire up. Continue with the installation. Make sure commandline tools, NDK (side by side) and CMake are install.

   Make sure commandline tools binaries are on the PATH.

4. Set the correct PATH

   Set the correct path for `$ANDROID_HOME`. Also, set the correct path for `$JAVA_HOME`

5. Try to run the build script

   See if the build is successful. If not, run expo-doctor and expo install --check script to see if any package version mismatch.

   If mismatch, use `pnpx expo install <package>` to install or update it to the correct version.

   If all packages version match, build should be successful, the apk file is emitted at project root.
