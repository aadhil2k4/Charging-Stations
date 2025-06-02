import { Station } from '../models/station.model.js';

export const createStation = async (req, res) => {
    const newStation = new Station(req.body);
    try {
        const savedStation = await newStation.save();
        res.status(200).json(savedStation);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const allStations = async(req, res) => {
    try {
        const stations = await Station.find();
        res.status(200).json(stations);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateStation = async(req, res) => {
    const { id } = req.params;
    try {
        const updatedStation = await Station.findByIdAndUpdate(
            id,
            { $set: req.body }, 
            { new: true } 
        );
        if (!updatedStation) {
            return res.status(404).json({ message: "Station not found" });
        }
        res.status(200).json(updatedStation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteStation = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStation = await Station.findByIdAndDelete(id);
        if (!deletedStation) {
            return res.status(404).json({ message: "Station not found" });
        }
        res.status(200).json({ message: "Station deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};