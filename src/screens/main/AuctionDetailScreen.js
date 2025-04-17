// screens/main/AuctionDetailScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Divider,
  ProgressBar,
  List,
  Avatar,
  ActivityIndicator,
  DataTable,
  Badge,
  Portal,
  Modal,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useRoute } from '@react-navigation/native';

// Mock data - would come from API in real app
const auctionDetails = {
  id: '1',
  title: 'Ahmedabad APMC',
  date: '15 April 2025',
  time: '10:00 AM to 2:00 PM',
  location: 'APMC Yard, Jamalpur, Ahmedabad',
  description: 'Weekly auction for agricultural produce including wheat, cotton, rice and other commodities. Farmers must register their lots before 9:00 AM on the auction day.',
  status: 'Upcoming',
  image: require('../../assets/apmc-1.jpg'),
  contact: {
    name: 'APMC Ahmedabad Office',
    phone: '+91 79 2532 4568',
    email: 'info@ahmedabadapmc.in',
  },
  commodities: [
    { 
      name: 'Wheat', 
      minPrice: '₹ 2,100', 
      avgPrice: '₹ 2,200', 
      maxPrice: '₹ 2,350',
      totalLots: 45,
    },
    { 
      name: 'Cotton', 
      minPrice: '₹ 6,300', 
      avgPrice: '₹ 6,500', 
      maxPrice: '₹ 6,800',
      totalLots: 32,
    },
    { 
      name: 'Rice', 
      minPrice: '₹ 2,800', 
      avgPrice: '₹ 2,900', 
      maxPrice: '₹ 3,100',
      totalLots: 28,
    },
  ],
  registrationDeadline: '14 April 2025, 5:00 PM',
  participatingMerchants: 78,
  myLots: [
    {
      id: 'L101',
      commodity: 'Cotton',
      quality: 'A-Grade',
      quantity: '1.5 Tons',
      status: 'Pending Approval',
      registeredOn: '10 April 2025',
    }
  ]
};

const AuctionDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const { auctionId } = route.params;
  
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedCommodity, setSelectedCommodity] = useState(null);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const showCommodityDetail = (commodity) => {
    setSelectedCommodity(commodity);
    setVisible(true);
  };

  const hideCommodityDetail = () => {
    setVisible(false);
  };

  const registerLot = () => {
    navigation.navigate('CreateListing', { auctionId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading auction details...</Text>
      </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return '#4CAF50';
      case 'Ongoing':
        return '#FFC107';
      case 'Completed':
        return '#757575';
      default:
        return '#4CAF50';
    }
  };

  const getLotStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4CAF50';
      case 'Pending Approval':
        return '#FFC107';
      case 'Rejected':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image 
          source={auctionDetails.image} 
          style={styles.headerImage} 
          resizeMode="cover"
        />
        
        <Animatable.View animation="fadeInUp" duration={800} style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Title style={styles.title}>{auctionDetails.title}</Title>
            <Chip 
              mode="outlined" 
              style={[styles.statusChip, { borderColor: getStatusColor(auctionDetails.status) }]}
            >
              {auctionDetails.status}
            </Chip>
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={18} color="#757575" />
              <Text style={styles.infoText}>{auctionDetails.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={18} color="#757575" />
              <Text style={styles.infoText}>{auctionDetails.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={18} color="#757575" />
              <Text style={styles.infoText}>{auctionDetails.location}</Text>
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <Text style={styles.sectionTitle}>Description</Text>
          <Paragraph style={styles.description}>{auctionDetails.description}</Paragraph>
          
          <View style={styles.registrationInfoContainer}>
            <View style={styles.registrationInfo}>
              <Text style={styles.registrationLabel}>Registration Deadline</Text>
              <Text style={styles.registrationValue}>{auctionDetails.registrationDeadline}</Text>
            </View>
            <View style={styles.registrationInfo}>
              <Text style={styles.registrationLabel}>Participating Merchants</Text>
              <Text style={styles.registrationValue}>{auctionDetails.participatingMerchants}</Text>
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <Button 
              mode="contained" 
              icon="plus" 
              onPress={registerLot}
              style={styles.registerButton}
            >
              Register New Lot
            </Button>
            <Button 
              mode="outlined" 
              icon="information-outline" 
              onPress={() => {/* Handle info */}}
              style={styles.infoButton}
            >
              More Info
            </Button>
          </View>
        </Animatable.View>
        
        {/* My Registered Lots Section */}
        <Animatable.View animation="fadeInUp" duration={800} delay={200} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Registered Lots</Text>
          
          {auctionDetails.myLots.length > 0 ? (
            auctionDetails.myLots.map(lot => (
              <Card key={lot.id} style={styles.lotCard}>
                <Card.Content>
                  <View style={styles.lotHeader}>
                    <View>
                      <Text style={styles.lotTitle}>{lot.commodity}</Text>
                      <Text style={styles.lotSubtitle}>{lot.quality} • {lot.quantity}</Text>
                    </View>
                    <Chip 
                      mode="outlined" 
                      style={[styles.lotStatusChip, { borderColor: getLotStatusColor(lot.status) }]}
                      textStyle={{ fontSize: 10 }}
                    >
                      {lot.status}
                    </Chip>
                  </View>
                  <Divider style={styles.lotDivider} />
                  <View style={styles.lotFooter}>
                    <Text style={styles.lotDate}>Registered on: {lot.registeredOn}</Text>
                    <Button 
                      mode="text" 
                      compact 
                      onPress={() => {/* View lot details */}}
                      style={styles.viewLotButton}
                    >
                      View Details
                    </Button>
                  </View>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyCardContent}>
                <MaterialIcons name="inventory" size={48} color="#BDBDBD" />
                <Text style={styles.emptyText}>No lots registered for this auction</Text>
                <Button 
                  mode="contained" 
                  onPress={registerLot}
                  style={styles.createButton}
                >
                  Register a Lot
                </Button>
              </Card.Content>
            </Card>
          )}
        </Animatable.View>
        
        {/* Commodities Section */}
        <Animatable.View animation="fadeInUp" duration={800} delay={300} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Commodities & Price Estimates</Text>
          
          <DataTable style={styles.dataTable}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>Commodity</DataTable.Title>
              <DataTable.Title numeric>Min Price</DataTable.Title>
              <DataTable.Title numeric>Avg Price</DataTable.Title>
              <DataTable.Title numeric>Total Lots</DataTable.Title>
            </DataTable.Header>

            {auctionDetails.commodities.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => showCommodityDetail(item)}>
                <DataTable.Row style={styles.tableRow}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.minPrice}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.avgPrice}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.totalLots}</DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          </DataTable>
          
          <Text style={styles.priceNote}>
            * Prices are estimated based on previous market trends and may vary during actual auction.
          </Text>
        </Animatable.View>
        
        {/* Contact Information */}
        <Animatable.View animation="fadeInUp" duration={800} delay={400} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <Card style={styles.contactCard}>
            <Card.Content>
              <View style={styles.contactRow}>
                <MaterialIcons name="business" size={20} color="#4CAF50" />
                <Text style={styles.contactText}>{auctionDetails.contact.name}</Text>
              </View>
              <TouchableOpacity style={styles.contactRow} onPress={() => {/* Handle call */}}>
                <MaterialIcons name="phone" size={20} color="#4CAF50" />
                <Text style={styles.contactText}>{auctionDetails.contact.phone}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactRow} onPress={() => {/* Handle email */}}>
                <MaterialIcons name="email" size={20} color="#4CAF50" />
                <Text style={styles.contactText}>{auctionDetails.contact.email}</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </Animatable.View>
        
        {/* Commodity Detail Modal */}
        <Portal>
          <Modal 
            visible={visible} 
            onDismiss={hideCommodityDetail}
            contentContainerStyle={styles.modalContainer}
          >
            {selectedCommodity && (
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedCommodity.name} Details</Text>
                  <TouchableOpacity onPress={hideCommodityDetail}>
                    <Ionicons name="close" size={24} color="#212121" />
                  </TouchableOpacity>
                </View>
                
                <Divider style={styles.modalDivider} />
                
                <View style={styles.priceRangeContainer}>
                  <View style={styles.priceRangeItem}>
                    <Text style={styles.priceRangeLabel}>Min Price</Text>
                    <Text style={styles.priceRangeValue}>{selectedCommodity.minPrice}</Text>
                  </View>
                  <View style={styles.priceRangeItem}>
                    <Text style={styles.priceRangeLabel}>Avg Price</Text>
                    <Text style={[styles.priceRangeValue, styles.avgPrice]}>
                      {selectedCommodity.avgPrice}
                    </Text>
                  </View>
                  <View style={styles.priceRangeItem}>
                    <Text style={styles.priceRangeLabel}>Max Price</Text>
                    <Text style={styles.priceRangeValue}>{selectedCommodity.maxPrice}</Text>
                  </View>
                </View>
                
                <View style={styles.lotInfoContainer}>
                  <Text style={styles.lotInfoTitle}>Total Lots: {selectedCommodity.totalLots}</Text>
                  <Text style={styles.lotInfoDescription}>
                    These are the expected lots to be auctioned based on current registrations.
                    Actual numbers may vary on auction day.
                  </Text>
                </View>
                
                <Divider style={styles.modalDivider} />
                
                <Text style={styles.historyTitle}>Price History (Last 4 Weeks)</Text>
                <View style={styles.graphPlaceholder}>
                  <Text style={styles.graphText}>Price trend graph will be shown here</Text>
                </View>
                
                <Button 
                  mode="contained" 
                  onPress={() => {
                    hideCommodityDetail();
                    registerLot();
                  }}
                  style={styles.modalButton}
                >
                  Register {selectedCommodity.name} Lot
                </Button>
              </View>
            )}
          </Modal>
        </Portal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#757575',
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  statusChip: {
    height: 28,
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#212121',
  },
  divider: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#212121',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#424242',
    marginBottom: 16,
  },
  registrationInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  registrationInfo: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  registrationLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  registrationValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212121',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  registerButton: {
    flex: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  infoButton: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#4CAF50',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 8,
  },
  lotCard: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  lotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lotTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lotSubtitle: {
    fontSize: 12,
    color: '#757575',
  },
  lotStatusChip: {
    height: 24,
  },
  lotDivider: {
    marginVertical: 8,
  },
  lotFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lotDate: {
    fontSize: 12,
    color: '#757575',
  },
  viewLotButton: {
    marginRight: -8,
  },
  emptyCard: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  emptyCardContent: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    marginTop: 8,
    marginBottom: 16,
    color: '#757575',
  },
  createButton: {
    marginTop: 8,
  },
  dataTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  tableHeader: {
    backgroundColor: '#E8F5E9',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  priceNote: {
    fontSize: 12,
    color: '#757575',
    fontStyle: 'italic',
    marginTop: 8,
    marginHorizontal: 4,
  },
  contactCard: {
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#212121',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalDivider: {
    marginVertical: 16,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceRangeItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  priceRangeLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  priceRangeValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avgPrice: {
    color: '#4CAF50',
  },
  lotInfoContainer: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  lotInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lotInfoDescription: {
    fontSize: 14,
    color: '#424242',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  graphPlaceholder: {
    height: 160,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  graphText: {
    color: '#9E9E9E',
  },
  modalButton: {
    borderRadius: 8,
  },
});

export default AuctionDetailScreen;