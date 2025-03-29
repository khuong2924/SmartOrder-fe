import axios from 'axios'

const API_URL = 'http://localhost/domain2'

class TableService {
  // Fetch all tables
  async getAllTables() {
    try {
      const response = await axios.get(`${API_URL}/tables`)
      return response.data.map(table => this.formatTableData(table))
    } catch (error) {
      console.error('Error fetching tables:', error)
      throw error
    }
  }

  // Format table data from API response
  formatTableData(table) {
    return {
      id: table.id,
      number: table.tableNumber,
      section: this.getTableSection(table.tableNumber),
      capacity: table.capacity,
      status: table.status.toLowerCase(),
      type: this.getTableType(table.tableNumber),
      orderInfo: table.status === 'OCCUPIED' ? {
        startTime: '19:30',
        itemCount: 0,
        totalAmount: 0
      } : null
    }
  }

  // Helper function to determine table type
  getTableType(tableNumber) {
    if (tableNumber.startsWith('VIP')) return 'vip'
    if (tableNumber.startsWith('REG')) return 'regular'
    if (tableNumber.startsWith('OUT')) return 'outdoor'
    return 'regular' // default type
  }

  // Helper function to determine table section
  getTableSection(tableNumber) {
    if (tableNumber.startsWith('VIP')) return 'Khu vực VIP'
    if (tableNumber.startsWith('REG')) return 'Khu vực thường'
    if (tableNumber.startsWith('OUT')) return 'Khu vực ngoài trời'
    return 'Khu vực thường' // default section
  }

  // Reserve a table
  async reserveTable(tableId, reservationData) {
    try {
      const response = await axios.post(`${API_URL}/tables/${tableId}/reserve`, reservationData)
      return response.data
    } catch (error) {
      console.error('Error reserving table:', error)
      throw error
    }
  }

  // Update table status
  async updateTableStatus(tableId, status) {
    try {
      const response = await axios.put(`${API_URL}/tables/${tableId}/status`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating table status:', error)
      throw error
    }
  }
}

export default new TableService()