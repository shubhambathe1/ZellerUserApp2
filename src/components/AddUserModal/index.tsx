import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';
import styles from './styles';
import { USER_ROLES } from '../../constants';
import { addUser } from '../../db/userTable';

const emailRegex = /\S+@\S+\.\S+/;

const AddUserModal = ({
  visible,
  onClose,
  onUserAdded,
}: {
  visible: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}) => {
  const insets = useSafeAreaInsets();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(USER_ROLES.ADMIN);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  const onCreateUser = async () => {
    if (loading) return;

    const isValid = validate();
    if (!isValid) return;

    try {
      setLoading(true);

      await addUser({
        id: uuid.v4() as string,
        name: `${firstName} ${lastName}`,
        email,
        role,
      });

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setRole(USER_ROLES.ADMIN);
      setErrors({});

      onUserAdded();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onCloseIconPress = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
    >
      {/* Background overlay – dismiss keyboard */}
      <Pressable style={styles.overlay} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'height' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 64 : 0}
          style={styles.keyboardWrapper}
        >
          {/* Prevent overlay press from closing modal */}
          <Pressable>
            <SafeAreaView style={styles.modalContainer}>
              <Pressable
                onPress={onCloseIconPress}
                style={styles.close}
                accessibilityLabel="Close add user modal"
                accessibilityRole="button"
              >
                <Text style={styles.closeText}>✕</Text>
              </Pressable>

              <Text style={styles.title}>New User</Text>

              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={text => {
                  setFirstName(text);
                  if (errors.firstName) {
                    setErrors(prev => ({ ...prev, firstName: undefined }));
                  }
                }}
                returnKeyType="next"
                style={[styles.input, errors.firstName && styles.inputError]}
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => {
                  setLastName(text);
                  if (errors.lastName) {
                    setErrors(prev => ({ ...prev, lastName: undefined }));
                  }
                }}
                returnKeyType="next"
                style={[styles.input, errors.lastName && styles.inputError]}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: undefined }));
                  }
                }}
                style={[styles.input, errors.email && styles.inputError]}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>User Role</Text>

              <View style={styles.roleContainer}>
                {[USER_ROLES.ADMIN, USER_ROLES.MANAGER].map(r => {
                  const isActive = r === role;
                  return (
                    <TouchableOpacity
                      key={r}
                      style={[styles.roleButton, isActive && styles.activeRole]}
                      onPress={() => setRole(r)}
                      accessibilityRole="button"
                      accessibilityLabel={`Select ${r} role`}
                    >
                      <Text
                        style={[
                          styles.roleText,
                          isActive && styles.activeRoleText,
                        ]}
                      >
                        {r}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={[styles.createButton, loading && styles.disabledButton]}
                onPress={onCreateUser}
                disabled={loading}
                accessibilityLabel="Create user"
                accessibilityRole="button"
              >
                <Text style={styles.createText}>
                  {loading ? 'Creating...' : 'Create User'}
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

export default AddUserModal;
