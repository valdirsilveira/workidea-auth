import { Service } from 'typedi'
import mongoose from 'mongoose'

@Service()
export class MongooseService {
  private isConnected = false

  async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      return
    }

    try {
      await mongoose.connect(uri)
      this.isConnected = true
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message)
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return
    }

    try {
      await mongoose.disconnect()
      this.isConnected = false
      console.log('Disconnected from MongoDB')
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error.message)
    }
  }
}
