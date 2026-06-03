import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Tab = createBottomTabNavigator();
const CREDIT_TEXT = 'Aluno Tellys - If Sul de Minas - Pocos de Caldas';

// Define o icone de cada aba. Na aba inicial, o icone muda conforme o saldo.
function getTabIcon(routeName, focused, balance) {
  if (routeName === 'Entrada') {
    if (balance < 0) {
      return focused ? 'alert-circle' : 'alert-circle-outline';
    }

    return focused ? 'wallet' : 'wallet-outline';
  }

  if (routeName === 'EntradaDinheiro') {
    return focused ? 'arrow-down-circle' : 'arrow-down-circle-outline';
  }

  if (routeName === 'SaidaDinheiro') {
    return focused ? 'arrow-up-circle' : 'arrow-up-circle-outline';
  }

  if (routeName === 'About') {
    return focused ? 'information-circle' : 'information-circle-outline';
  }

  return focused ? 'call' : 'call-outline';
}

// Layout base compartilhado por todas as paginas.
function ScreenLayout({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.appTitle}>Conta Corrente</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>{children}</View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{CREDIT_TEXT}</Text>
      </View>
    </SafeAreaView>
  );
}

// Tela principal com saldo e situacao da conta.
function HomeScreen({ balance }) {
  const statusLabel = balance < 0 ? 'Devedor' : 'Positivo';
  const formattedBalance = balance.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <ScreenLayout>
      <Text style={styles.pageTitle}>Pagina de Entrada</Text>
      <Text style={styles.paragraph}>
        Bem-vindo ao gestor de conta corrente experimental.
      </Text>
      <Text style={styles.balanceLabel}>Saldo atual</Text>
      <Text style={styles.balanceValue}>{formattedBalance}</Text>
      <Text
        style={[
          styles.status,
          balance >= 0 ? styles.statusPositive : styles.statusNegative,
        ]}
      >
        Situacao: {statusLabel}
      </Text>
    </ScreenLayout>
  );
}

// Tela de entrada de dinheiro.
function DepositScreen({ depositValue, setDepositValue, onDeposit }) {
  return (
    <ScreenLayout>
      <Text style={styles.pageTitle}>Entrada de Dinheiro</Text>
      <TextInput
        value={depositValue}
        onChangeText={setDepositValue}
        keyboardType="decimal-pad"
        placeholder="Digite o valor da entrada"
        style={styles.input}
      />
      <Pressable style={styles.actionButton} onPress={onDeposit}>
        <Text style={styles.actionButtonText}>Registrar Entrada</Text>
      </Pressable>
    </ScreenLayout>
  );
}

// Tela de saida de dinheiro.
function WithdrawScreen({ withdrawValue, setWithdrawValue, onWithdraw }) {
  return (
    <ScreenLayout>
      <Text style={styles.pageTitle}>Saida de Dinheiro</Text>
      <TextInput
        value={withdrawValue}
        onChangeText={setWithdrawValue}
        keyboardType="decimal-pad"
        placeholder="Digite o valor da saida"
        style={styles.input}
      />
      <Pressable style={styles.actionButton} onPress={onWithdraw}>
        <Text style={styles.actionButtonText}>Registrar Saida</Text>
      </Pressable>
    </ScreenLayout>
  );
}

// Tela institucional com descricao do app.
function AboutScreen() {
  return (
    <ScreenLayout>
      <Text style={styles.pageTitle}>About</Text>
      <Text style={styles.paragraph}>
        O app Conta Corrente simula operacoes simples de movimentacao e consulta
        de saldo para fins academicos.
      </Text>
    </ScreenLayout>
  );
}

// Tela de contato.
function ContactScreen() {
  return (
    <ScreenLayout>
      <Text style={styles.pageTitle}>Contact</Text>
      <Text style={styles.paragraph}>Email: contato@contacorrente.app</Text>
      <Text style={styles.paragraph}>Telefone: (35) 99999-9999</Text>
    </ScreenLayout>
  );
}

export default function App() {
  // Estados principais da conta corrente simulada.
  const [balance, setBalance] = useState(0);
  const [depositValue, setDepositValue] = useState('');
  const [withdrawValue, setWithdrawValue] = useState('');
  const isDebt = balance < 0;

  // Soma o valor digitado ao saldo quando a entrada e valida.
  const handleDeposit = () => {
    const amount = Number(depositValue.replace(',', '.'));
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setBalance((oldBalance) => oldBalance + amount);
    setDepositValue('');
  };

  // Subtrai o valor digitado do saldo quando a saida e valida.
  const handleWithdraw = () => {
    const amount = Number(withdrawValue.replace(',', '.'));
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setBalance((oldBalance) => oldBalance - amount);
    setWithdrawValue('');
  };

  // Configura a barra inferior com cores e icones dinamicos.
  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor:
      route.name === 'Entrada' ? (isDebt ? '#b91c1c' : '#15803d') : '#0f766e',
    tabBarInactiveTintColor: '#64748b',
    tabBarStyle: {
      backgroundColor: '#f8fafc',
      borderTopColor: '#cbd5e1',
      height: 62,
    },
    tabBarLabelStyle: {
      fontSize: 10,
      fontWeight: '700',
    },
    tabBarIcon: ({ color, size, focused }) => (
      <Ionicons
        name={getTabIcon(route.name, focused, balance)}
        size={size}
        color={color}
      />
    ),
  });

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Entrada" options={{ tabBarLabel: 'Inicio' }}>
          {() => <HomeScreen balance={balance} />}
        </Tab.Screen>
        <Tab.Screen
          name="EntradaDinheiro"
          options={{ title: 'Entrada R$', tabBarLabel: 'Entrada' }}
        >
          {() => (
            <DepositScreen
              depositValue={depositValue}
              setDepositValue={setDepositValue}
              onDeposit={handleDeposit}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="SaidaDinheiro"
          options={{ title: 'Saida R$', tabBarLabel: 'Saida' }}
        >
          {() => (
            <WithdrawScreen
              withdrawValue={withdrawValue}
              setWithdrawValue={setWithdrawValue}
              onWithdraw={handleWithdraw}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{ tabBarLabel: 'Sobre' }}
        />
        <Tab.Screen
          name="Contact"
          component={ContactScreen}
          options={{ tabBarLabel: 'Contato' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2ff',
  },
  header: {
    backgroundColor: '#1f2937',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    rowGap: 12,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  paragraph: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 22,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#334155',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },
  status: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusPositive: {
    color: '#15803d',
  },
  statusNegative: {
    color: '#b91c1c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  actionButton: {
    backgroundColor: '#0f766e',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  footerText: {
    color: '#f8fafc',
    textAlign: 'center',
    fontSize: 12,
  },
});
