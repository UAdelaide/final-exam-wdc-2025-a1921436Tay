router.get('/dogs', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT dog_id, name, size FROM Dogs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});