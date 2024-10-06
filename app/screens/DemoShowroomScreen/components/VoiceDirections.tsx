// // VoiceDirections.js
// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import * as Speech from 'expo-speech';
// import { Ionicons } from '@expo/vector-icons';

// const VoiceDirections = ({ instructions }) => {
//   const speak = () => {
//     if (instructions.length > 0) {
//       Speech.speak(instructions[0].html_instructions, {
//         voice: 'com.apple.ttsbundle.Samantha-compact', // Use a female voice (iOS specific)
//         rate: 1.0,
//       });
//     }
//   };

//   return (
//     <TouchableOpacity onPress={speak} style={styles.voiceButton}>
//       <Ionicons name="volume-high" size={24} color="white" />
//       <Text style={styles.buttonText}>Voice</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   voiceButton: {
//     backgroundColor: 'purple',
//     padding: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   buttonText: {
//     color: 'white',
//     marginLeft: 5,
//   },
// });

// export default VoiceDirections;

import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

const VoiceDirections = ({ instructions, voiceActive, setVoiceActive }) => {
  const lastInstructionRef = useRef(null);

  useEffect(() => {
    if (voiceActive && instructions.length > 0) {
      const currentInstruction = instructions[0].html_instructions;
      if (currentInstruction !== lastInstructionRef.current) {
        Speech.speak(currentInstruction, {
          voice: 'com.apple.ttsbundle.Samantha-compact', // Use a female voice (iOS specific)
          rate: 1.0,
        });
        lastInstructionRef.current = currentInstruction;
      }
    }
  }, [voiceActive, instructions]);

  const toggleVoice = () => {
    setVoiceActive(!voiceActive);
    if (voiceActive) {
      Speech.stop();
    }
  };

  return (
    <TouchableOpacity onPress={toggleVoice} style={styles.voiceButton}>
      <Ionicons name="volume-high" size={24} color="white" />
      <Text style={styles.buttonText}>{voiceActive ? 'Stop Voice' : 'Start Voice'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  voiceButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
});

export default VoiceDirections;
