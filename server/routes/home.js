module.exports = function Home() {
  return {
    index: async (req, res) => {
      res.render('pages/index', {})
    },
  }
}
