import React, { useState, useMemo, useRef, FC, useEffect } from "react";
import { TextInput, ViewStyle, TextStyle, ActivityIndicator, View, Text, Alert } from "react-native";
import { Button, Icon, Screen, TextField } from "../components";
import { AppStackScreenProps, navigate } from "../navigators";
import { colors, spacing } from "../theme";
import { useDispatch, useSelector } from 'react-redux';
import { register as registerAction } from '../../server/actions/userAction';
import { RootState } from '../../server/store';
import { Picker } from '@react-native-picker/picker';
import { observer } from "mobx-react-lite";

interface RegisterScreenProps extends AppStackScreenProps<"Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null);
  const authEmailInput = useRef<TextInput>(null);
  const { navigation } = _props;

  const [username, setUsername] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [userType, setUserType] = useState("normal");
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isDemo, setIsDemo] = useState("True");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);

  const dispatch = useDispatch();
  const userRegister = useSelector((state: RootState) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  function goToLogin() {
    navigation.navigate("Login", { screen: "LoginScreen", params: {} });
  }

  useEffect(() => {
    setUsername("");
    setAuthEmail("");
    setAuthPassword("");
    setIsDemo("True");

    return () => {
      setUsername("");
      setAuthEmail("");
      setAuthPassword("");
      setIsDemo("True");
    };
  }, []);

  useEffect(() => {
    // console.log('User Info:', userInfo); // Log userInfo for debugging
  
    if (userInfo) {
      Alert.alert(
        "Welcome Back",
        "A minute please as we are setting things up..."
      );

      setTimeout(() => {
        if (!userInfo.is_demo) {
          console.log('Navigating to Home');
          goToHome();
        } else {
          console.log('Navigating to Splash');
          navigation.navigate("Splash");
        }
      }, 3000); // 3000 milliseconds = 3 seconds delay
    }
  }, [userInfo]);

  
  const goToHome = () => {
    navigation.navigate("Demo", { screen: "DemoNavigator", params: {} });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setAttemptsCount(attemptsCount + 1);

    // Ensure isDemo is false for Admin user type
    const finalIsDemo = userType === "admin" ? "False" : isDemo;
    dispatch(registerAction(username, authEmail, authPassword, userType, finalIsDemo));
  };

  const PasswordRightAccessory = useMemo(() => (
    function PasswordRightAccessory() {
      return (
        <Icon
          icon={isAuthPasswordHidden ? "view" : "hidden"}
          color={colors.palette.neutral800}
          size={20}
          onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
        />
      );
    }
  ), [isAuthPasswordHidden]);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="register-heading" tx="signUpScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="signUpScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="signUpScreen.hint" size="sm" weight="light" style={$hint} />}
      {error && <Text style={$error}>{error}</Text>}

      <TextField
        value={username}
        onChangeText={setUsername}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        labelTx="signUpScreen.usernameFieldLabel"
        placeholderTx="signUpScreen.usernameFieldPlaceholder"
        onSubmitEditing={() => authEmailInput.current?.focus()}
      />

      <TextField
        ref={authEmailInput}
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="signUpScreen.passwordFieldLabel"
        placeholderTx="signUpScreen.passwordFieldPlaceholder"
        onSubmitEditing={handleSubmit}
        RightAccessory={PasswordRightAccessory}
      />

      <View style={$pickerContainer}>
        <Text style={$pickerLabel}>Account Type</Text>
        <Picker
          selectedValue={userType}
          style={$picker}
          onValueChange={(itemValue) => setUserType(itemValue)}
        >
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Admin (No support For Demo Mode)" value="admin" />
        </Picker>
      </View>

      {userType === "normal" && (
        <View style={$pickerContainer}>
          <Text style={$pickerLabel}>Demo Mode (Kilimani Area)</Text>
          <Picker
            selectedValue={isDemo}
            style={$picker}
            onValueChange={(itemValue) => setIsDemo(itemValue)}
          >
            <Picker.Item label="OFF" value="False" />
            <Picker.Item label="ON" value="True" />
          </Picker>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={$loading} />
      ) : (
        <>
          <Button
            testID="register-button"
            tx="signUpScreen.tapToSignUp"
            style={$tapButton}
            preset="reversed"
            onPress={handleSubmit}
          />
          <Button
            testID="login-button"
            tx="signUpScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={goToLogin}
          />
        </>
      )}

    </Screen>
  );
});

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
};

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
};

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
};

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
};

const $loading: ViewStyle = {
  marginVertical: spacing.md,
  alignSelf: "center",
};

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
};

const $pickerContainer: ViewStyle = {
  marginBottom: spacing.lg,
};

const $picker: ViewStyle = {
  height: 50,
  width: '100%',
};

const $pickerLabel: TextStyle = {
  fontSize: 16,
  marginBottom: 5,
};
