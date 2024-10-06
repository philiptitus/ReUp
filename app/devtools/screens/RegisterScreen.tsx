import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const RegisterScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const { navigation } = _props

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  function goToLogin() {
    navigation.navigate("Login", { screen: "LoginScreen", params: {} })
  }

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    setAuthEmail("ignite@infinite.red")
    setAuthPassword("ign1teIsAwes0m3")

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    // We'll mock this with a fake token.
    setAuthToken(String(Date.now()))
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

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="signUpScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="signUpScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="signUpScreen.hint" size="sm" weight="light" style={$hint} />}


      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect={false}
        keyboardType="default"
        labelTx="signUpScreen.usernameFieldLabel"
        placeholderTx="signUpScreen.usernameFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="signUpScreen.emailFieldLabel"
        placeholderTx="signUpScreen.emailFieldPlaceholder"
        helper={error}
        status={error ? "error" : undefined}
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
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
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
        labelTx="signUpScreen.confirmPasswordFieldLabel"
        placeholderTx="signUpScreen.confirmPasswordFieldPlaceholder"
        onSubmitEditing={login}
        RightAccessory={PasswordRightAccessory}
      />

      <Button
        testID="login-button"
        tx="signUpScreen.tapToSignUp"
        style={$tapButton}
        preset="reversed"
        onPress={login}
      />
            <Button
        testID="login-button"
        tx="signUpScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={goToLogin}
      />
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

// @demo remove-file
