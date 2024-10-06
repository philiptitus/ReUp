import React, { FC, useState, useRef } from "react"
import { Modal, TextInput, TextStyle, View, ViewStyle, ScrollView, ActivityIndicator } from "react-native"
import { Button, Text, TextField } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { useDispatch, useSelector } from 'react-redux'
import { createIncome as createIncomeAction } from '../../../../server/actions/postActions'
import { RootState } from '../store'

const IncomeForm: FC = () => {
  const [amount, setAmount] = useState("")
  const [source, setSource] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const passwordInput = useRef<TextInput>(null)
  const dispatch = useDispatch()
  const incomeCreate = useSelector((state: RootState) => state.incomeCreate)
  const { loading, error, success } = incomeCreate

  const errorMessage = isSubmitted && (!amount || !source || !description) ? "All fields are required." : ""

  function handleSubmit() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (!amount || !source || !description) return

    dispatch(createIncomeAction({ amount, source, description }))

    // Reset form fields if submission is successful
    if (success) {
      setIsSubmitted(false)
      setAmount("")
      setSource("")
      setDescription("")
      // setIsModalVisible(false) // Close modal after submission
    }
  }

  function openModal() {
    setIsModalVisible(true)
  }

  function closeModal() {
    setIsModalVisible(false)
  }

  return (
    <View style={$root}>
      <Button
        text="Add an Income Source"
        onPress={openModal}
        style={$openButton}
      />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={$modalBackground}>
          <View style={$modalContainer}>
            <ScrollView contentContainerStyle={$scrollViewContent}>
              <Text preset="heading" text="Add Income Source" style={$title} />
              <Text text="Enter income details below" style={$tagline} />
              {attemptsCount > 2 && <Text text="Please fill in all fields" size="sm" weight="light" style={$hint} />}
              {errorMessage && <Text style={$error}>{errorMessage}</Text>}
              {error && <Text style={$error}>{error}</Text>}
              {success && <Text style={$success}>Income added successfully!</Text>}

              <TextField
                value={amount}
                onChangeText={setAmount}
                containerStyle={$textField}
                label="Amount"
                placeholder="Enter amount"
                helper={errorMessage}
                status={errorMessage ? "error" : undefined}
                keyboardType="numeric"
              />

              <TextField
                value={source}
                onChangeText={setSource}
                containerStyle={$textField}
                label="Source"
                placeholder="Enter source"
                helper={errorMessage}
                status={errorMessage ? "error" : undefined}
              />

              <TextField
                value={description}
                onChangeText={setDescription}
                containerStyle={$textField}
                label="Description"
                placeholder="Enter description"
                helper={errorMessage}
                status={errorMessage ? "error" : undefined}
              />

              {loading ? (
                <ActivityIndicator size="large" color={colors.primary} style={$loadingIndicator} />
              ) : (
                <Button
                  testID="submitIncome-button"
                  text="Submit"
                  style={$tapButton}
                  preset="reversed"
                  onPress={handleSubmit}
                />
              )}
              <Button
                text="Close"
                onPress={closeModal}
                style={$closeButton}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export const DemoIncome: Demo = {
  name: "New Income",
  description: "Do you have a new Income source?.",
  data: [
    <IncomeForm />
  ],
}

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $tagline: TextStyle = {
  marginBottom: spacing.xxl,
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

const $openButton: ViewStyle = {
  margin: spacing.lg,
}

const $closeButton: ViewStyle = {
  marginTop: spacing.sm,
}

const $modalBackground: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}

const $modalContainer: ViewStyle = {
  width: '90%',
  backgroundColor: 'white',
  borderRadius: 10,
  padding: spacing.lg,
  alignItems: "center",
}

const $scrollViewContent: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
}

const $error: TextStyle = {
  color: "red",
  marginBottom: spacing.md,
}

const $success: TextStyle = {
  color: "green",
  marginBottom: spacing.md,
}

const $loadingIndicator: ViewStyle = {
  marginVertical: spacing.md,
}

export default IncomeForm
