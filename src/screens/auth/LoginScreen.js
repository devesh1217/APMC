// screens/auth/LoginScreen.js

import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Title, 
  Paragraph,
  HelperText
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = () => {
    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
      return false;
    } else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      setPhoneNumberError('Please enter a valid 10-digit mobile number');
      return false;
    }
    
    setPhoneNumberError('');
    return true;
  };

  const handleLogin = () => {
    if (validatePhoneNumber()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('OtpVerification', { phoneNumber });
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animatable.View 
            animation="fadeIn" 
            duration={1200} 
            style={styles.logoContainer}
          >
            <Image 
              source={require('../../assets/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Title style={styles.appTitle}>KisanMarket</Title>
            <Paragraph style={styles.tagline}>
              ગુજરાતના ખેડૂતો માટે ડિજિટલ બજાર
            </Paragraph>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={300}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.loginText}>Login to continue</Text>

            <View style={styles.inputContainer}>
              <TextInput
                label="Mobile Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
                left={<TextInput.Affix text="+91" />}
                mode="outlined"
                style={styles.input}
                error={!!phoneNumberError}
              />
              <HelperText type="error" visible={!!phoneNumberError}>
                {phoneNumberError}
              </HelperText>

              <Button 
                mode="contained"
                onPress={handleLogin}
                style={styles.loginButton}
                loading={isLoading}
                disabled={isLoading}
              >
                Get OTP
              </Button>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.helpContainer}>
              <TouchableOpacity>
                <Text style={styles.helpText}>Need Help?</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#4CAF50',
  },
  tagline: {
    textAlign: 'center',
    marginTop: 5,
    color: '#757575',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loginText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 4,
  },
  loginButton: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#757575',
  },
  registerLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  helpContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  helpText: {
    color: '#4CAF50',
  },
});

export default LoginScreen;