import Crypto from '../models/Crypto.js';

// Get all cryptocurrencies
export const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: cryptos,
    });
  } catch (err) {
    console.error('Get cryptos error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not fetch cryptocurrencies',
    });
  }
};

// Get single cryptocurrency by ID
export const getCryptoById = async (req, res) => {
  try {
    const crypto = await Crypto.findById(req.params.id);
    if (!crypto) {
      return res.status(404).json({
        success: false,
        error: 'Cryptocurrency not found',
      });
    }
    res.json({
      success: true,
      data: crypto,
    });
  } catch (err) {
    console.error('Get crypto by ID error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not fetch cryptocurrency',
    });
  }
};

// Get top gainers (sorted by highest 24h change)
export const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);
    
    res.json({
      success: true,
      data: gainers,
    });
  } catch (err) {
    console.error('Get gainers error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not fetch gainers',
    });
  }
};

// Get new listings (most recently added)
export const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      success: true,
      data: newListings,
    });
  } catch (err) {
    console.error('Get new listings error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not fetch new listings',
    });
  }
};

// Add new cryptocurrency
export const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    // Validation
    if (!name || !symbol || price === undefined || change24h === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Name, symbol, price, and change24h are required',
      });
    }

    // Check if symbol already exists
    const existing = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Cryptocurrency with this symbol already exists',
      });
    }

    // Create new crypto
    const crypto = await Crypto.create({
      name,
      symbol: symbol.toUpperCase(),
      price: parseFloat(price),
      image,
      change24h: parseFloat(change24h),
    });

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto,
    });
  } catch (err) {
    console.error('Add crypto error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not add cryptocurrency',
    });
  }
};

// Update cryptocurrency
export const updateCrypto = async (req, res) => {
  try {
    const { name, price, change24h, image } = req.body;

    const crypto = await Crypto.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(change24h !== undefined && { change24h: parseFloat(change24h) }),
        ...(image && { image }),
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!crypto) {
      return res.status(404).json({
        success: false,
        error: 'Cryptocurrency not found',
      });
    }

    res.json({
      success: true,
      message: 'Cryptocurrency updated successfully',
      data: crypto,
    });
  } catch (err) {
    console.error('Update crypto error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not update cryptocurrency',
    });
  }
};

// Delete cryptocurrency
export const deleteCrypto = async (req, res) => {
  try {
    const crypto = await Crypto.findByIdAndDelete(req.params.id);
    if (!crypto) {
      return res.status(404).json({
        success: false,
        error: 'Cryptocurrency not found',
      });
    }

    res.json({
      success: true,
      message: 'Cryptocurrency deleted successfully',
    });
  } catch (err) {
    console.error('Delete crypto error:', err);
    res.status(500).json({
      success: false,
      error: 'Could not delete cryptocurrency',
    });
  }
};
