# music-reco
Experiments with music recommendation

## Running the Project

To run both the frontend and backend, open **two separate terminals**:

1. **Frontend**  
   ```bash
   # From the project root directory
   npm start
   ```

2. **Backend**  
   ```bash
   # In a separate terminal, navigate to the backend folder
   cd backend
   uvicorn server:app --reload
   ```

You should now have both servers running locally:
- Frontend at http://localhost:3000  
- Backend at http://127.0.0.1:8000
