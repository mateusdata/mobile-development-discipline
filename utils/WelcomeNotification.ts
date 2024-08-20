import * as Notifications from 'expo-notifications';

export const WelcomeNotification = async (title: string, message: string, delay: number) => {
 
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
  }
  if (finalStatus !== 'granted') {
      console.log('Falha ao obter permissão para notificações!');
      return;
  }

 
  Notifications.setNotificationHandler({
      handleNotification: async () => {
         
          return {
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
          };
      },
  });

 
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: message,
      sound: true,
      vibrate: [10, 2000],
      data: { example: 'data' }
    },
    trigger: null
  });
};
