/* eslint-disable react/jsx-key, react-native/no-inline-styles */
import React from "react"
import { AutoImage, Button, Card, Icon } from "../../../components"
import { colors, spacing } from "../../../theme"
import { Demo } from "../DemoShowroomScreen"
import { DemoDivider } from "../DemoDivider"
import { DemoUseCase } from "../DemoUseCase"
import IncomeCards from "../components/IncomeCards"
import SavingPlans from "../components/SavingPlans"
import { AppStackScreenProps } from "../../../navigators"
import { LoginScreen } from "app/screens/LoginScreen"
import CommunityScreen from '../components/Community'


interface DemoCardScreenProps extends AppStackScreenProps<"DemoCard"> {}


export const DemoCard: FC<Demo> = {
  
  name: "Existing Incomes And Saving Plans",
  description:
    "Your Previously Created Income Streams And Saving Plans.",
  data: [


    <DemoUseCase
      name="Saving Plans"
      description="Click On A Savings Plan To Customize"
    >
      

<CommunityScreen/>


      <DemoDivider />

     
    </DemoUseCase>,


  ],
}

// @demo remove-file
