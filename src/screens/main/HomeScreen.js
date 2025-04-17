// screens/main/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Chip,
  Divider,
  List,
  Avatar,
  ActivityIndicator,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

// Mock data - would come from API in real app
const upcomingAuctions = [
  {
    id: '1',
    title: 'Ahmedabad APMC',
    date: '15 April 2025',
    time: '10:00 AM',
    commodities: ['Wheat', 'Cotton', 'Rice'],
    image: require('../../assets/apmc-1.jpg'),
  },
  {
    id: '2',
    title: 'Rajkot APMC',
    date: '17 April 2025',
    time: '9:30 AM',
    commodities: ['Groundnut', 'Cotton'],
    image: require('../../assets/apmc-2.jpg'),
  },
  {
    id: '3',
    title: 'Surat APMC',
    date: '19 April 2025',
    time: '11:00 AM',
    commodities: ['Sugarcane', 'Vegetables'],
    image: require('../../assets/apmc-3.jpg'),
  },
];

const marketPrices = [
  { commodity: 'Cotton', price: '₹ 6,500', unit: 'per Quintal', trend: 'up' },
  { commodity: 'Wheat', price: '₹ 2,200', unit: 'per Quintal', trend: 'down' },
  { commodity: 'Groundnut', price: '₹ 5,800', unit: 'per Quintal', trend: 'up' },
  { commodity: 'Rice', price: '₹ 2,900', unit: 'per Quintal', trend: 'stable' },
];

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Rajeshbhai');
  const [myListings, setMyListings] = useState([
    {
      id: '101',
      commodity: 'Cotton',
      quality: 'A-Grade',
      quantity: '1.5 Tons',
      status: 'Upcoming',
      auctionDate: '15 April 2025',
    }
  ]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderAuctionItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AuctionDetail', { auctionId: item.id })}
    >
      <Card style={styles.auctionCard}>
        <Card.Cover source={item.image} style={styles.auctionImage} />
        <Card.Content>
          <Title style={styles.auctionTitle}>{item.title}</Title>
          <View style={styles.auctionDetails}>
            <View style={styles.auctionDetailRow}>
              <Ionicons name="calendar-outline" size={16} color="#757575" />
              <Text style={styles.auctionDetailText}>{item.date}</Text>
            </View>
            <View style={styles.auctionDetailRow}>
              <Ionicons name="time-outline" size={16} color="#757575" />
              <Text style={styles.auctionDetailText}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.commodityChips}>
            {item.commodities.map((commodity, index) => (
              <Chip key={index} style={styles.chip} textStyle={styles.chipText}>
                {commodity}
              </Chip>
            ))}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderMarketPrice = ({ item }) => (
    <Card style={styles.priceCard}>
      <Card.Content style={styles.priceCardContent}>
        <View>
          <Text style={styles.commodityName}>{item.commodity}</Text>
          <Text style={styles.priceUnit}>{item.unit}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          {item.trend === 'up' && (
            <Ionicons name="arrow-up" size={16} color="#4CAF50" />
          )}
          {item.trend === 'down' && (
            <Ionicons name="arrow-down" size={16} color="#F44336" />
          )}
          {item.trend === 'stable' && (
            <Ionicons name="remove" size={16} color="#FFC107" />
          )}
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header with greeting */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => {/* Handle notifications */}}
          >
            <Ionicons name="notifications-outline" size={24} color="#212121" />
          </TouchableOpacity>
        </View>

        {/* My Active Listings Section */}
        <Animatable.View animation="fadeInUp" duration={800} delay={300}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Listings</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Create')}>
              <Text style={styles.seeAllText}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          {myListings.length > 0 ? (
            myListings.map(listing => (
              <Card key={listing.id} style={styles.listingCard}>
                <Card.Content>
                  <View style={styles.listingHeader}>
                    <View>
                      <Title style={styles.listingTitle}>{listing.commodity}</Title>
                      <Paragraph style={styles.listingSubtitle}>
                        {listing.quality} • {listing.quantity}
                      </Paragraph>
                    </View>
                    <Chip 
                      mode="outlined" 
                      style={[
                        styles.statusChip, 
                        listing.status === 'Upcoming' ? styles.upcomingChip : {}
                      ]}
                    >
                      {listing.status}
                    </Chip>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.listingFooter}>
                    <Text style={styles.auctionDateText}>
                      <Ionicons name="calendar-outline" size={14} color="#757575" /> Auction: {listing.auctionDate}
                    </Text>
                    <Button 
                      mode="text" 
                      compact 
                      onPress={() => {/* View details */}}
                      style={styles.viewDetailsButton}
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
                <MaterialCommunityIcons name="package-variant" size={48} color="#BDBDBD" />
                <Text style={styles.emptyText}>No active listings</Text>
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('Create')}
                  style={styles.createButton}
                >
                  Create New Listing
                </Button>
              </Card.Content>
            </Card>
          )}
        </Animatable.View>

        {/* Upcoming Auctions Section */}
        <Animatable.View animation="fadeInUp" duration={800} delay={400}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Auctions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Auctions')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={upcomingAuctions}
            renderItem={renderAuctionItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.auctionList}
          />
        </Animatable.View>

        {/* Market Prices Section */}
        <Animatable.View animation="fadeInUp" duration={800} delay={500}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Market Prices</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={marketPrices}
            renderItem={renderMarketPrice}
            keyExtractor={item => item.commodity}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.priceList}
          />
        </Animatable.View>

        {/* News and Updates */}
        <Animatable.View animation="fadeInUp" duration={800} delay={600} style={styles.newsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>News & Updates</Text>
          </View>
          
          <Card style={styles.newsCard}>
            <Card.Content>
              <Title style={styles.newsTitle}>Government Announces New MSP for Rabi Crops</Title>
              <Paragraph style={styles.newsDate}>10 April 2025</Paragraph>
              <Paragraph numberOfLines={3} style={styles.newsContent}>
                The Government of Gujarat has announced new Minimum Support Prices for Rabi crops. 
                The MSP for wheat has been increased by 5% to provide better returns to farmers.
              </Paragraph>
              <Button mode="text" compact style={styles.readMoreButton}>
                Read More
              </Button>
            </Card.Content>
          </Card>
          
          <Card style={styles.newsCard}>
            <Card.Content>
              <Title style={styles.newsTitle}>Weather Alert: Rain Expected in Central Gujarat</Title>
              <Paragraph style={styles.newsDate}>12 April 2025</Paragraph>
              <Paragraph numberOfLines={3} style={styles.newsContent}>
                Meteorological Department has issued an alert for moderate rainfall in parts of 
                Central Gujarat over the next 48 hours. Farmers are advised to take necessary precautions.
              </Paragraph>
              <Button mode="text" compact style={styles.readMoreButton}>
                Read More
              </Button>
            </Card.Content>
          </Card>
        </Animatable.View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 14,
    color: '#757575',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  seeAllText: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  listingCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listingTitle: {
    fontSize: 18,
  },
  listingSubtitle: {
    color: '#757575',
  },
  statusChip: {
    borderColor: '#FFC107',
  },
  upcomingChip: {
    borderColor: '#4CAF50',
  },
  divider: {
    marginVertical: 12,
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  auctionDateText: {
    fontSize: 12,
    color: '#757575',
  },
  viewDetailsButton: {
    marginRight: -8,
  },
  emptyCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
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
  auctionList: {
    paddingHorizontal: 8,
  },
  auctionCard: {
    width: 250,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 2,
  },
  auctionImage: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  auctionTitle: {
    fontSize: 16,
    marginTop: 4,
  },
  auctionDetails: {
    marginTop: 4,
  },
  auctionDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  auctionDetailText: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
  },
  commodityChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#E8F5E9',
  },
  chipText: {
    fontSize: 10,
  },
  priceList: {
    paddingHorizontal: 8,
  },
  priceCard: {
    width: 150,
    marginHorizontal: 8,
    borderRadius: 12,
    elevation: 2,
  },
  priceCardContent: {
    justifyContent: 'space-between',
    height: 80,
  },
  commodityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceUnit: {
    fontSize: 12,
    color: '#757575',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginRight: 4,
  },
  newsSection: {
    paddingBottom: 24,
  },
  newsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 16,
  },
  newsDate: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: '#212121',
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 0,
  },
});

export default HomeScreen;