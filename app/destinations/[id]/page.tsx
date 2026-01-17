import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar, Clock, ArrowLeft, Compass, Mountain, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DestinationGallery from "@/components/destination-gallery"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RelatedDestinations from "@/components/related-destinations"

// This would typically come from a database or API
const getDestinationData = (id: string) => {
  const destinations = {
    kalam: {
      name: "Kalam",
      title: "Kalam - The Jewel of Swat Valley",
      description:
        "Kalam is a scenic valley located in the upper reaches of Swat Valley, known for its breathtaking landscapes, lush forests, meadows, and stunning waterfalls. Situated at an elevation of about 2,000 meters (6,600 feet), Kalam offers a cool climate and spectacular views of snow-capped mountains.",
      longDescription: [
        "Kalam Valley is one of the most beautiful destinations in Swat, offering visitors a perfect retreat into nature. The valley is blessed with dense pine forests, crystal-clear rivers, and panoramic mountain views that create a picturesque setting for travelers seeking tranquility and natural beauty.",
        "The Swat River flows through Kalam, adding to its scenic charm and providing opportunities for fishing and riverside relaxation. The surrounding mountains, often snow-covered in winter, create a dramatic backdrop that changes colors throughout the day as the sun moves across the sky.",
        "Kalam is also known for its traditional wooden houses that reflect the local architectural style, adding cultural interest to the natural beauty. The local people are known for their hospitality and traditional lifestyle, offering visitors a glimpse into the authentic culture of the region.",
      ],
      location: "Upper Swat Valley, Khyber Pakhtunkhwa, Pakistan",
      mainImage: "https://media.istockphoto.com/id/1373165258/photo/jansahae-meadows-kalam-swat-valley-pakistan.jpg?s=612x612&w=0&k=20&c=sTSC5QWiOqz8zqFXSvz-lObqWkvyjwKpedtOc8tDaZ4=",
      activities: ["Hiking", "Fishing", "Photography", "Camping", "Waterfall visits"],
      bestTimeToVisit: "May to September",
      averageTemperature: "Summer: 15-25°C, Winter: -5-10°C",
      distanceFromMingora: "100 km (approximately 3-4 hours drive)",
      attractions: [
        {
          name: "Ushu Forest",
          description: "Dense pine forest with hiking trails and scenic views",
        },
        {
          name: "Matiltan",
          description: "A beautiful village known for its panoramic views and meadows",
        },
        {
          name: "Swat River",
          description: "Perfect for fishing and enjoying the riverside scenery",
        },
        {
          name: "Ushu Valley",
          description: "A picturesque valley with stunning mountain views",
        },
        {
          name: "Local Bazaar",
          description: "Traditional market selling local handicrafts and products",
        },
      ],
      galleryImages: [
        {
          src: "https://i.dawn.com/primary/2019/02/5c572e136fa2c.jpg",
          alt: "Panoramic view of Kalam Valley",
        },
        {
          src: "https://www.prideofpakistan.com/header_images//header_large_43.jpg",
          alt: "Swat River flowing through Kalam",
        },
        {
          src: "https://visitsilkroad.org/wp-content/uploads/2021/04/Kalam-Village-featured_image.jpg",
          alt: "Dense pine forests in Kalam",
        },
        {
          src: "https://tripako.com/wp-content/uploads/2020/12/umbrella-5.jpg",
          alt: "Beautiful waterfall near Kalam",
        },
        {
          src: "https://seepakistantours.com/wp-content/uploads/2022/11/Chitral-Kalam-8-Days-tour.jpg",
          alt: "Traditional wooden houses in Kalam",
        },
        {
          src: "https://live.staticflickr.com/2935/14240824645_99e7e67186_b.jpg",
          alt: "Snow-capped mountains surrounding Kalam",
        },
        {
          src: "https://www.thenews.com.pk/assets/uploads/tns/2021-07-18/865539_9828612_tns-48_tns.jpg",
          alt: "Lush green meadows in Kalam Valley",
        },
        {
          src: "https://media.istockphoto.com/id/1303833000/photo/meadows-of-kalam.jpg?s=612x612&w=0&k=20&c=izfHDCqjvy4YebjuFV54dpOeYjNwLQIj2a46VaL-KvU=",
          alt: "Sunset over Kalam Valley mountains",
        },
        {
          src: "https://prestinetravels.com/wp-content/uploads/2021/05/mall-road-murree-123.jpg",
          alt: "Colorful local market in Kalam",
        },
      ],
    },
    "mahodand-lake": {
      name: "Mahodand Lake",
      title: "Mahodand Lake - Alpine Beauty of Swat",
      description:
        "Mahodand Lake is a stunning alpine lake located in the upper Ushu Valley of Swat, surrounded by snow-capped mountains, lush meadows, and pine forests. The name 'Mahodand' means 'Lake of Fish' in the local language, reflecting the abundance of trout fish in its crystal-clear waters.",
      longDescription: [
        "Mahodand Lake is one of the most picturesque destinations in Swat Valley, offering breathtaking views of the surrounding Hindu Kush mountains. The lake is situated at an elevation of about 2,900 meters (9,500 feet), creating a serene alpine environment that captivates visitors with its natural beauty.",
        "The journey to Mahodand Lake is an adventure in itself, taking travelers through winding mountain roads, dense forests, and meadows filled with wildflowers during the summer months. The lake is fed by the melting snow from surrounding mountains, ensuring its waters remain crystal clear and cold throughout the year.",
        "The area around the lake is perfect for camping, offering visitors the chance to experience the tranquility of nature and the stunning night sky filled with stars. The lake is also famous for trout fishing, attracting fishing enthusiasts from across the country.",
      ],
      location: "Ushu Valley, Upper Swat, Khyber Pakhtunkhwa, Pakistan",
      mainImage: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1667826870/Mahodand_Lake_pakistan.jpg",
      activities: ["Fishing", "Boating", "Camping", "Photography", "Hiking"],
      bestTimeToVisit: "June to September",
      averageTemperature: "Summer: 10-20°C, Winter: Below freezing",
      distanceFromMingora: "140 km (approximately 5-6 hours drive)",
      attractions: [
        {
          name: "Trout Fishing",
          description: "The lake is famous for its abundance of trout fish",
        },
        {
          name: "Surrounding Meadows",
          description: "Lush green meadows perfect for camping and picnics",
        },
        {
          name: "Mountain Views",
          description: "Panoramic views of the Hindu Kush mountain range",
        },
        {
          name: "Local Food Stalls",
          description: "Seasonal food stalls offering fresh trout and local cuisine",
        },
        {
          name: "Ushu Forest",
          description: "Dense pine forest surrounding the lake area",
        },
      ],
      galleryImages: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF0XOnPDbEfk_TKnXbN1IBgI1M60yXk0rgLw&s",
          alt: "Panoramic view of Mahodand Lake",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4IClDyGSIsDqcjFFTG7XkZHgMRzsTOvWhJg&s",
          alt: "Mountains reflecting in Mahodand Lake",
        },
        {
          src: "https://res.cloudinary.com/rehash-studio/image/upload/fl_progressive:semi,f_auto,q_auto,w_auto,dpr_auto/if_w_gt_1920,w_1920/files/cwecykewqmfbmclrzevh.jpg",
          alt: "Lush meadows surrounding Mahodand Lake",
        },
        { 
          src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/6a/b0/60/mahodand-lake-swat-kalam.jpg?w=800&h=400&s=1",
          alt: "Trout fishing at Mahodand Lake",
        },
        {
          src: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1667826870/Mahodand_Lake_pakistan.jpg",
          alt: "Camping site near Mahodand Lake",
        },
        {
          src: "https://res.cloudinary.com/www-travelpakistani-com/image/upload/v1675688792/Saifullah_Lake_Swat.jpg",
          alt: "Sunset over Mahodand Lake",
        },
        {
          src: "https://www.ajktours.com/wp-content/uploads/2023/11/Mahodand_Lake_winter-2.jpg.webp",
          alt: "Mahodand Lake in winter with frozen surface",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCSc_WOKMm3VCRTnu5QPeiRx8bjX3KWBGLEw&s",
          alt: "Wildflowers blooming around Mahodand Lake",
        },
        {
          src: "https://www.exploria.pk/wp-content/uploads/2024/08/tour-33-edited.jpg",
          alt: "Aerial view of Mahodand Lake and surroundings",
        },
      ],
    },
    "malam-jabba": {
      name: "Malam Jabba",
      title: "Malam Jabba - Pakistan's Premier Ski Resort",
      description:
        "Malam Jabba is Pakistan's oldest and most famous ski resort, located in the Hindu Kush mountain range at an elevation of about 2,804 meters (9,200 feet). The resort offers stunning mountain views, skiing facilities, and year-round natural beauty.",
      longDescription: [
        "Malam Jabba Ski Resort is a jewel in Swat Valley's crown, offering world-class skiing facilities during winter and breathtaking natural beauty throughout the year. The resort was established in the 1980s with assistance from Austria and has since become a premier destination for winter sports enthusiasts in Pakistan.",
        "The ski slopes at Malam Jabba are suitable for both beginners and experienced skiers, with professional instructors available to guide newcomers. The resort is equipped with modern facilities including ski lifts, equipment rentals, and accommodation options ranging from luxury hotels to more affordable lodging.",
        "Beyond skiing, Malam Jabba offers visitors panoramic views of Swat Valley and the surrounding mountains, making it a popular destination even during the summer months when the lush green slopes and pleasant weather attract hikers and nature lovers seeking respite from the heat of the plains.",
      ],
      location: "Hindu Kush Range, Swat Valley, Khyber Pakhtunkhwa, Pakistan",
      mainImage: "https://kumrattourism.com/wp-content/uploads/2023/01/Malam-Jabba2.jpg",
      activities: ["Skiing", "Snowboarding", "Hiking", "Chairlift rides", "Mountain biking"],
      bestTimeToVisit: "Winter (December to February) for skiing, Summer (May to September) for hiking",
      averageTemperature: "Summer: 15-25°C, Winter: -5-10°C",
      distanceFromMingora: "40 km (approximately 1.5 hours drive)",
      attractions: [
        {
          name: "Ski Slopes",
          description: "Well-maintained slopes for skiing and snowboarding",
        },
        {
          name: "Chairlift",
          description: "Scenic chairlift offering panoramic views of the valley",
        },
        {
          name: "Malam Jabba Hotel",
          description: "Luxury accommodation with modern amenities",
        },
        {
          name: "Hiking Trails",
          description: "Various trails through pine forests and mountain terrain",
        },
        {
          name: "Viewpoints",
          description: "Spectacular viewpoints overlooking Swat Valley",
        },
      ],
      galleryImages: [
        {
          src: "https://i.pinimg.com/736x/bd/1e/64/bd1e644f819528e9077ff45e85c8eea9.jpg",
          alt: "Snow-covered slopes at Malam Jabba",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMQxejauKzsIqGrCwoeW4U0bS7aJKDqyRcdg&s",
          alt: "Skiing activities at Malam Jabba",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb5Iui2mAwzM83YHP7X_pavYe65utLDMw9MQ&s",
          alt: "Lush green slopes during summer",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIe4u9s-SkafHQXvT0cJflO6mwYmKtfYn0XQ&s",
          alt: "Chairlift at Malam Jabba with mountain views",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QwTTjF5Rm0LKeyc-usrkhebl_CqrW2O10Q&s",
          alt: "Malam Jabba Ski Resort hotel and facilities",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8FQVLqsAXOIQmgprwC9ILZjM59JctopwCg&s",
          alt: "Panoramic view from Malam Jabba mountaintop",
        },
        {
          src: "https://q-xx.bstatic.com/xdata/images/hotel/max500/597786575.jpg?k=1295ad0f4c54fa91f10eef8341e243baebac7c04e694e6fd7bb20257ed67f617&o=",
          alt: "Sunset view from Malam Jabba resort",
        },
        {
          src: "https://img.redbull.com/images/c_limit,w_1500,h_1000/f_auto,q_auto/redbullcom/2023/2/27/pugkcbpvnp8bwnmciou3/red-bull-homerun-at-malam-jabba-pakistan-2023",
          alt: "Snowboarding action at Malam Jabba",
        },
        {
          src: "https://www.travelertrails.com/wp-content/uploads/2022/11/Malam-Jabba-2.jpg",
          alt: "Summer hiking trail at Malam Jabba",
        },
      ],
    },
    "swat-museum": {
      name: "Swat Museum",
      title: "Swat Museum - Gateway to Gandhara Civilization",
      description:
        "The Swat Museum houses one of Pakistan's most important collections of Gandhara art and artifacts, showcasing the rich cultural heritage and ancient history of the Swat region.",
      longDescription: [
        "The Swat Museum, located in Saidu Sharif, is a treasure trove of historical artifacts that tell the story of the region's rich past. Established in 1959, the museum was expanded and renovated in 2012 with assistance from the Italian government, creating a modern facility to preserve and display the cultural heritage of Swat.",
        "The museum houses an impressive collection of Gandhara art, including Buddha statues, relief panels, and architectural elements dating back to the 1st to 7th centuries CE. These artifacts provide valuable insights into the Buddhist civilization that once flourished in the region, making the museum a significant site for both researchers and tourists interested in ancient history.",
        "Beyond Buddhist artifacts, the museum also displays items from other periods of Swat's history, including prehistoric tools, Islamic art, ethnographic collections, and coins from various eras. The well-organized exhibits guide visitors through the evolution of civilization in the Swat Valley, from prehistoric times to the modern era.",
      ],
      location: "Saidu Sharif, Swat, Khyber Pakhtunkhwa, Pakistan",
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Swat_Museum.jpg",
      activities: ["Guided tours", "Archaeological exploration", "Cultural education", "Photography"],
      bestTimeToVisit: "Year-round",
      averageTemperature: "Varies by season, indoor facility",
      distanceFromMingora: "3 km (approximately 10 minutes drive)",
      attractions: [
        {
          name: "Gandhara Gallery",
          description: "Collection of Buddhist sculptures and artifacts",
        },
        {
          name: "Ethnographic Section",
          description: "Displays of traditional Swati culture and lifestyle",
        },
        {
          name: "Coin Collection",
          description: "Ancient coins from various periods of Swat's history",
        },
        {
          name: "Archaeological Finds",
          description: "Items excavated from various archaeological sites in Swat",
        },
        {
          name: "Temporary Exhibitions",
          description: "Rotating exhibits on various aspects of Swat's heritage",
        },
      ],
      galleryImages: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsVcL2KQFfSxBF261bQWRL8cNJGzVIGLtAZXUh7ZE-GU44q85iWwDULbhqUS_Onb1h3tA&usqp=CAU",
          alt: "Exterior of Swat Museum",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDzGdjudzRMXKoHqG2X0EFgbkR69t9VquuOw&s",
          alt: "Buddha statues in Swat Museum",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8TRHELdiynvQZR5o8-bJgVt9OJ80EA4JKg&s",
          alt: "Gandhara art relief panels",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZyfK_7kj_ky3wuh9ksW5nKdu67tBfj-ResWSkzcTQQ-0PffsNXOkfOBAP6Pvpiv1sg40&usqp=CAU",
          alt: "Interior main gallery of Swat Museum",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrKlhdOJftwAwR7SmgSf8kfz8qoQlrOqwREw&s",
          alt: "Ancient pottery artifacts display",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9jelr9hSZq04CTBKsJrHXodhRdo3CVs-4cw&s",
          alt: "Historical coin collection from various eras",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnQSh9xKFnszIOcCoWIW6ygfYQPcDgYammuQ&s",
          alt: "Model of a Buddhist stupa from ancient Swat",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXZrtDTxvQMpzy4X6NWKCzeTD_KQE9Z3Md6g&s",
          alt: "Traditional Swati cultural items display",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR44XIbRCrbn1oQWzBwlTY9eG2psyohkIWhTA&s",
          alt: "Ancient tools discovered in archaeological digs",
        },
      ],
    },
    mangora: {
      name: "mangora",
      title: "Mangora - The Urban Heart of Swat Valley",
      description:
        "Mingora is the largest city and commercial hub of Swat Valley, offering a blend of urban amenities and access to the natural beauty of the surrounding region.",
      longDescription: [
        "Mingora serves as the gateway to Swat Valley and is the region's main urban center, offering visitors a range of amenities including hotels, restaurants, markets, and transportation services. The city's strategic location makes it an ideal base for exploring the many natural and cultural attractions of Swat Valley.",
        "The bustling bazaars of Mingora are famous for their variety of goods, including traditional Swati handicrafts, embroidered textiles, semi-precious stones, and local agricultural products. These markets provide visitors with opportunities to experience local culture and purchase authentic souvenirs.",
        "Despite being an urban center, Mingora is surrounded by natural beauty, with the Swat River flowing through the city and mountains visible in the distance. The city also has historical significance, with several important sites nearby, including ancient Buddhist stupas and the former royal residence of the Wali of Swat.",
      ],
      location: "Central Swat Valley, Khyber Pakhtunkhwa, Pakistan",
      mainImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Photo_of_Madyan_-_Swat_%2811%29.jpg/2560px-Photo_of_Madyan_-_Swat_%2811%29.jpg",
      activities: ["Shopping", "Cultural exploration", "Local cuisine", "City tours"],
      bestTimeToVisit: "Year-round, Spring and Autumn are particularly pleasant",
      averageTemperature: "Summer: 25-35°C, Winter: 5-15°C",
      distanceFromMingora: "City center",
      attractions: [
        {
          name: "Green Square",
          description: "The main city square and gathering place",
        },
        {
          name: "Swat Bazaar",
          description: "Traditional market selling local handicrafts and goods",
        },
        {
          name: "Fiza Ghat Park",
          description: "Riverside park popular with locals and visitors",
        },
        {
          name: "Mingora Food Street",
          description: "Area known for traditional Swati cuisine",
        },
        {
          name: "Wadudia Hall",
          description: "Historical building from the era of the Wali of Swat",
        },
      ],
      galleryImages: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Stars_on_the_Earth.jpg/1200px-Stars_on_the_Earth.jpg",
          alt: "Aerial view of Mingora city",
        },
        {
          src: "https://swatvalley.pk/wp-content/uploads/2017/10/22528263_1546900048698930_2234971099165557498_n.jpg",
          alt: "Bustling main market in Mingora",
        },
        {
          src: "https://raasty.com/wp-content/uploads/2024/03/Fizaghat-Raasty.jpg",
          alt: "Swat River flowing through Mingora",
        },
        {
          src: "https://live.staticflickr.com/1570/25719439905_8ebfe58414_b.jpg",
          alt: "Busy street scene in Mingora",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFmqTGRSnW3lWcuVuubayP2655T-dpTIwFA&s",
          alt: "Fiza Ghat Park with families enjoying leisure time",
        },
        {
          src: "https://www.imusafir.pk/blog/wp-content/uploads/2024/10/fizaghat.jpg",
          alt: "Traditional architectural details in Mingora",
        },
        {
          src: "https://media.istockphoto.com/id/1095071178/photo/swat-pakistan.jpg?s=612x612&w=0&k=20&c=i_rJKroVzS9bkJYwo5b7LKBpQ7tgd1zJmj-hxg4TUPg=",
          alt: "Colorful food street with local cuisine",
        },
        {
          src: "https://live.staticflickr.com/7488/15155110173_06f0860366_b.jpg",
          alt: "Traditional handicrafts for sale in Mingora market",
        },
        {
          src: "https://swatvalley.pk/wp-content/uploads/2020/05/98338456_2995547487167505_3411626869789818880_o.jpg",
          alt: "View of Mingora with mountains in background",
        },
      ],
    },
    bahrain: {
      name: "Bahrain",
      title: "Bahrain - Riverside Charm of Swat Valley",
      description:
        "Bahrain is a picturesque town located along the banks of the Swat River, known for its riverside restaurants, pleasant climate, and as a gateway to the upper reaches of Swat Valley.",
      longDescription: [
        "Bahrain is a charming town situated at the confluence of the Swat and Daral rivers, creating a naturally beautiful setting that attracts visitors seeking relaxation and natural beauty. The town is famous for its riverside restaurants built on wooden platforms extending over the rushing waters, offering a unique dining experience with the soothing sound of the river as background.",
        "The town serves as an important stop on the journey to upper Swat destinations like Kalam and Mahodand Lake, providing travelers with a pleasant place to rest and enjoy the scenery. The surrounding hills and mountains create a picturesque backdrop, while the river adds a dynamic element to the landscape.",
        "Bahrain has a rich cultural heritage, with the local population maintaining traditional lifestyles and crafts. The town is known for its woodwork, particularly walnut wood products, and visitors can find authentic handicrafts in the local markets. The area is also known for its fresh produce, including delicious fruits like apples, peaches, and apricots grown in the surrounding orchards.",
      ],
      location: "Mid Swat Valley, Khyber Pakhtunkhwa, Pakistan",
      mainImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCkq9sZzUNtXH7il7X0CuU3yP7myO3BH9uLBJbNcatVxwwqhqJ8-4hcb0j8vzEZKcLJt8&usqp=CAU",
      activities: ["Riverside dining", "Trout fishing", "Short hikes", "Photography", "Relaxation"],
      bestTimeToVisit: "April to October",
      averageTemperature: "Summer: 20-30°C, Winter: 0-15°C",
      distanceFromMingora: "65 km (approximately 2 hours drive)",
      attractions: [
        {
          name: "Riverside Restaurants",
          description: "Famous eateries built on platforms over the Swat River",
        },
        {
          name: "Bahrain Bazaar",
          description: "Local market selling traditional crafts and fresh produce",
        },
        {
          name: "River Confluence",
          description: "Meeting point of Swat and Daral rivers",
        },
        {
          name: "Surrounding Hills",
          description: "Scenic hills offering short hiking opportunities",
        },
        {
          name: "Traditional Architecture",
          description: "Wooden houses built in the traditional Swati style",
        },
      ],
      galleryImages: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG5XNJ-U0CAsHKEROMjfAgb-euwFaNYo8zD7agrBFQ5m0GI3F2F1EGpchkuTRuvvlvOA0&usqp=CAU",
          alt: "Swat River flowing through Bahrain",
        },
        {
          src: "https://www.pakistantoursguide.pk/wp-content/uploads/2015/07/Ushu-Valley-Swat-Pakistan.jpg",
          alt: "Traditional riverside restaurant on wooden platform",
        },
        {
          src: "https://visitsilkroad.org/wp-content/uploads/2021/06/Bahrain-Village-featured_image.jpg",
          alt: "Scenic view of Bahrain town nestled in mountains",
        },
        {
          src: "https://live.staticflickr.com/535/18644509813_28c0287435_c.jpg",
          alt: "Mountains surrounding Bahrain town",
        },
        {
          src: "https://gypsytours.pk/wp-content/uploads/2024/03/Bahrain-Swat-Valley-KPK-1024x1024.png",
          alt: "Suspension bridge over Swat River in Bahrain",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS27MDI54dhR5jIFJdlCW3FkGdFB71f-8UNA&s",
          alt: "Colorful local market in Bahrain",
        },
        {
          src: "https://www.travelertrails.com/wp-content/uploads/2022/10/Bahrain-Swat-6.jpg",
          alt: "White water rapids on Swat River at Bahrain",
        },
        {
          src: "https://i.dawn.com/large/2013/12/52b979f32b78b.jpg",
          alt: "Traditional wooden houses in Bahrain",
        },
        {
          src: "https://prestinetravels.com/wp-content/uploads/2023/04/bahrain-swat-2.jpg",
          alt: "Fruit orchards surrounding Bahrain town",
        },
      ],
    },
  }

  return destinations[id as keyof typeof destinations] || null
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const destination = getDestinationData(params.id)

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "The requested destination could not be found.",
    }
  }

  return {
    title: destination.title,
    description: destination.description,
  }
}

export default function DestinationPage({ params }: { params: { id: string } }) {
  const destination = getDestinationData(params.id)

  if (!destination) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src={destination.mainImage || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="container mx-auto">
            <Link
              href="/destinations"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Destinations
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{destination.location}</span>
            </div>
            <p className="max-w-3xl text-lg text-white/90">{destination.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Description */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
              {destination.longDescription.map((paragraph, index) => (
                <p key={index} className="mb-4 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>

            <Separator />

            {/* Attractions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Key Attractions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {destination.attractions.map((attraction, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{attraction.name}</h3>
                      <p className="text-sm text-muted-foreground">{attraction.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Activities</h2>
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((activity, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
              <DestinationGallery images={destination.galleryImages} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold mb-2">Travel Information</h3>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Best Time to Visit</h4>
                    <p className="text-sm text-muted-foreground">{destination.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sun className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Weather</h4>
                    <p className="text-sm text-muted-foreground">{destination.averageTemperature}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Distance</h4>
                    <p className="text-sm text-muted-foreground">{destination.distanceFromMingora}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm text-muted-foreground">{destination.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mountain className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Activities</h4>
                    <p className="text-sm text-muted-foreground">{destination.activities.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Plan Your Visit</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to explore {destination.name}? Let us help you plan the perfect trip with accommodations,
                  transportation, and guided tours.
                </p>
                <Button className="w-full">Book a Tour</Button>
                <Button variant="outline" className="w-full mt-2">
                  Contact Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related Destinations */}
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Explore More Destinations</h2>
          <RelatedDestinations currentDestination={params.id} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
