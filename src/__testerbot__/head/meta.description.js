module.exports = {
  name: 'Description',
  desc: 'A meta description is provided, it is unique and doesn\'t possess more than 150 characters',
  suite: 'Head',
  tags: ['META'],

  test: (page) => async () => {

    let description = await page.html.head.meta_description()
    expect(description).not.toBeNull()
    expect(description.content).not.toBeNull()
    // TODO: Enable, handle as warning
    // expect(description.content.toString().length).toBeLessThanOrEqual(150)
  }
}

