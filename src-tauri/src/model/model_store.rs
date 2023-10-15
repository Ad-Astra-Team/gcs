pub struct ModelStore;

impl ModelStore {
    pub async fn new() -> Result<Self, ()> {
        Ok(ModelStore)
    }

    pub fn get(&self) -> &Self {
        self.clone()
    }
}
