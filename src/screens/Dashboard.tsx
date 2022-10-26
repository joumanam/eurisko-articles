import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { useAppSelector } from '../redux/rtkHooks';


export default function Dashboard() {
  const user = useAppSelector((store) => store.user);

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}