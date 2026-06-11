# Stockpilot Dashboard

A modern inventory management dashboard built with Next.js 16, React, and Tailwind CSS. This frontend connects to the Stockpilot Spring Boot backend API.

## Features

- **Analytics Dashboard**: View key statistics, stock trends, and performance metrics
- **Product Management**: Add, edit, and delete products with categories and suppliers
- **Category Management**: Organize products into categories
- **Supplier Management**: Manage supplier information and contact details
- **Stock Visualization**: Charts showing stock movements and category performance
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Interactive data visualization
- **SWR**: Data fetching and caching
- **Axios**: HTTP client
- **Lucide React**: Icon library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running Stockpilot backend (Spring Boot API)

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure the API URL in `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                          # Next.js app router pages
│   ├── page.tsx                 # Dashboard home page
│   ├── products/                # Products management
│   ├── categories/              # Categories management
│   └── suppliers/               # Suppliers management
├── components/                   # Reusable React components
│   ├── navbar.tsx               # Navigation bar
│   ├── dashboard/               # Dashboard components
│   ├── products/                # Product-related components
│   ├── categories/              # Category-related components
│   └── suppliers/               # Supplier-related components
├── lib/
│   ├── api.ts                   # API client and types
│   └── utils.ts                 # Utility functions
├── globals.css                  # Global styles
└── tailwind.config.ts           # Tailwind configuration
```

## API Integration

The dashboard communicates with the Stockpilot backend through REST APIs:

- **Products**: `/api/produits`
- **Categories**: `/api/categories`
- **Suppliers**: `/api/fournisseurs`
- **Stock Movements**: `/api/mouvements-stock`
- **Statistics**: `/api/statistiques`

## Features by Page

### Dashboard
- Total products count
- Total stock value
- Low stock alerts
- Recent stock movements
- Stock movement trends (7 days)
- Top performing categories
- Best and worst performing products

### Products
- View all products with pagination
- Search products by name or description
- Add new products with category and supplier assignment
- Edit product details
- Delete products
- Stock status indicators (In Stock / Low Stock)

### Categories
- View all categories
- Add new categories
- Edit category details
- Delete categories

### Suppliers
- View all suppliers with contact information
- Add new suppliers
- Edit supplier details
- Delete suppliers
- Display email, phone, and address information

## Error Handling

The dashboard includes robust error handling:
- API connection errors with helpful messages
- Loading states during data fetching
- Form validation for data entry
- User-friendly error notifications

## Design

The dashboard features a professional, modern design with:
- Clean blue and gray color scheme
- Responsive grid layouts using Tailwind CSS
- Smooth transitions and hover effects
- Clear typography hierarchy
- Intuitive navigation

## Performance

- **SWR Caching**: Automatic data caching and revalidation
- **Lazy Loading**: Components load on demand
- **Image Optimization**: Next.js image optimization
- **CSS**: Tailwind CSS for minimal CSS output

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues

If you see "Connection Error" message:
1. Ensure the Spring Boot backend is running
2. Verify the `NEXT_PUBLIC_API_URL` environment variable is correct
3. Check that CORS is enabled on the backend

### Port Already in Use

If port 3000 is already in use, you can specify a different port:
```bash
npm run dev -- -p 3001
```

## Future Enhancements

- User authentication and authorization
- Export data to CSV/Excel
- Advanced filtering and sorting
- Stock movement history details
- Supplier performance metrics
- Real-time notifications for low stock
- Mobile app version

## License

Stockpilot Dashboard © 2024. All rights reserved.

## Support

For issues or questions, please contact the development team.
