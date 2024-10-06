import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle, ActivityIndicator, Alert } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing } from "../theme"
import { useDispatch, useSelector } from 'react-redux'
import { login as loginAction } from '../../server/actions/userAction'
import { RootState } from '../store'

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const { navigation } = _props

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  function goToRegister() {
    navigation.navigate("Register", { screen: "RegisterScreen", params: {} })
  }

  function goToReset() {
    navigation.navigate("Reset", { screen: "PasswordReset", params: {} })
  }

  useEffect(() => {
    setAuthEmail("")
    setAuthPassword("")

    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  useEffect(() => {
    console.log('User Info:', userInfo); // Log userInfo for debugging
  
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
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)
    dispatch(loginAction(authEmail, authPassword))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  const prefillAdminCredentials = () => {
    setAuthEmail("larryowade3@gmail.com")
    setAuthPassword("Mimi123!")
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
      {error && <Text style={$error}>{error}</Text>}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={isSubmitted && validationError ? validationError : ""}
        status={isSubmitted && validationError ? "error" : undefined}
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
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        onSubmitEditing={handleSubmit}
        RightAccessory={PasswordRightAccessory}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={$loading} />
      ) : (
        <>
          <Button
            testID="login-button"
            tx="loginScreen.tapToSignIn"
            style={$tapButton}
            preset="reversed"
            onPress={handleSubmit}
          />
          <Button
            testID="register-button"
            tx="loginScreen.tapToSignUp"
            style={$tapButton}
            preset="reversed"
            onPress={goToRegister}
          />
          <Button
            testID="reset-button"
            tx="loginScreen.tapToReset"
            style={$tapButton}
            preset="reversed"
            onPress={goToReset}
          />
          <Text
            onPress={prefillAdminCredentials}
            style={$adminLink}
            testID="admin-login-link"
          >
            Try out as the Kilimani Administrator
          </Text>
        </>
      )}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
}

const $loading: ViewStyle = {
  marginVertical: spacing.md,
  alignSelf: "center",
}

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
}

const $adminLink: TextStyle = {
  color: colors.primary,
  textDecorationLine: 'underline',
  marginTop: spacing.md,
  textAlign: 'center',
}
