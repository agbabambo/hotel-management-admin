import { db } from './db'
import { amenities } from './data/amenities'
import { roomTypes } from './data/roomTypes'
import { amenity_RoomTypes } from './data/amenity_RoomTypes'
import { hotels } from './data/hotels'
import { rooms } from './data/rooms'
import { amenity_Hotels } from './data/amenity_Hotels'
import { discounts } from './data/discounts'
import { addresses } from './data/addresses'
import { users } from './data/user'

const main = async () => {
  try {
    // await db.address.createMany({ data: addresses })
    // await db.amenity.createMany({ data: amenities })
    // await db.hotel.createMany({ data: hotels })
    // await db.amenity_Hotel.createMany({ data: amenity_Hotels })
    // await db.roomType.createMany({ data: roomTypes })
    // await db.amenity_RoomType.createMany({ data: amenity_RoomTypes })
    // @ts-ignore
    // await db.room.createMany({ data: rooms })
    // await db.discount.createMany({ data: discounts })
    // await db.user.createMany({ data: users })
    // ********** DELETE *******
    // await db.amenity_RoomType.deleteMany()
    // await db.amenity_Hotel.deleteMany()
    // await db.discount.deleteMany()
    // await db.room.deleteMany()
    // await db.roomType.deleteMany()
    // await db.amenity.deleteMany()
    // await db.address.deleteMany()
    // await db.hotel.deleteMany()
  } catch (err) {
    console.log(err)
  } finally {
  }
}

main()
