import React, { FC, useState, useRef } from 'react';
import { TextInput, TextStyle, ViewStyle, ActivityIndicator } from 'react-native';
import { Button, Icon, Screen, Text, TextField, TextFieldAccessoryProps } from '../components';
import { colors, spacing } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { forgot_password as resetPasswordAction } from '../../server/actions/userAction';
import { RootState } from '../../server/store';

export const PasswordReset: FC = () => {
  const emailInput = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  
  const dispatch = useDispatch();
  const forgotPassword = useSelector((state: RootState) => state.forgotPassword);
  const { loading, error, success } = forgotPassword;

  const handleSubmit = () => {
    setIsSubmitted(true);
    setAttemptsCount(attemptsCount + 1);
    dispatch(resetPasswordAction(email));
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={['top', 'bottom']}
    >
      <Text testID="password-reset-heading" style={$heading}>Reset Your Password</Text>
      <Text style={$subheading}>Enter your email address below and we'll send you instructions to reset your password.</Text>
      
      {attemptsCount > 2 && <Text style={$hint}>Please check the email you entered and try again if necessary.</Text>}
      {error && <Text style={$error}>{error}</Text>}
      {success && <Text style={$success}>A reset link has been sent to your email address.</Text>}

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        placeholder="Email Address"
        helper={isSubmitted && !email ? 'Email address is required' : ''}
        status={isSubmitted && !email ? 'error' : undefined}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        ref={emailInput}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={$loading} />
      ) : (
        <Button
          testID="submit-button"
          style={$submitButton}
          preset="reversed"
          onPress={handleSubmit}
        >
          Submit
        </Button>
      )}
    </Screen>
  );
};

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $heading: TextStyle = {
  marginBottom: spacing.sm,
  fontSize: 24,
  fontWeight: 'bold',
};

const $subheading: TextStyle = {
  marginBottom: spacing.lg,
  fontSize: 16,
};

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
};

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
};

const $submitButton: ViewStyle = {
  marginTop: spacing.xs,
};

const $loading: ViewStyle = {
  marginVertical: spacing.md,
  alignSelf: 'center',
};

const $error: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
};

const $success: TextStyle = {
  color: colors.success,
  marginBottom: spacing.md,
};
