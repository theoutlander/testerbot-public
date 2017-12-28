const timeout = 5000

describe('Title', () => {
    let page = new global.Page()

    beforeAll(async () => {
      await page.goto('http://localhost:5000')
    }, timeout)

    it('should load without error', async () => {
      expect(await page.title()).not.toBeNull()
    })
  },
  timeout
)
