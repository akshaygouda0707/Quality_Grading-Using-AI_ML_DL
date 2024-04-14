
# Quality Grading of Areca Plates using CNN

This project aims to automate the quality grading of Areca plates using Convolutional Neural Networks (CNNs). The system classifies Areca plates into three grades: Class A, Class B, and Class C based on quality parameters.

## Introduction
- Biodegradable plates, such as Areca plates, offer an eco-friendly alternative to plastic and paper-based products.
- Manual quality grading of Areca plates is labor-intensive and prone to errors, necessitating automation using AI/ML techniques.

## Working Procedure
1. **Data Collection**: 
   - Gather a diverse dataset of Areca plate images, including examples of Class A, B, and C plates.
   - Ensure variation in lighting conditions, angles, and quality attributes.

2. **Data Preprocessing**:
   - Resize images to a uniform size suitable for training.
   - Normalize pixel values to a common scale (e.g., [0, 1]).
   - Augment the dataset to increase its size and improve model generalization.

3. **Model Selection (MobileNet)**:
   - Choose the MobileNet architecture for its balance between performance and efficiency.

4. **Model Training**:
   - Utilize transfer learning by fine-tuning the pre-trained MobileNet model on the Areca plate dataset.
   - Split the dataset into training, validation, and testing sets.

5. **Model Deployment**:
   - Save the trained model weights and architecture for future use.
   - Develop a web application using Flask for deploying the model.
   - Implement a user interface where users can upload images of Areca plates and receive predicted quality grades.

6. **Documentation**:
   - Create a detailed README file providing instructions for setting up and using the project.
   - Include information on dependencies, installation steps, and usage guidelines.
   - Document the model architecture, training process, and evaluation results for reference.

## Additional Code Chunks
### Model Architecture
```python
from keras.applications.mobilenet import MobileNet
from keras.layers import GlobalAveragePooling2D, Dense, Dropout, Flatten, BatchNormalization
from keras.models import Model

# Load MobileNet base model
base_model = MobileNet(weights='imagenet', include_top=False, input_shape=(224,224,3))

# Add custom classification layers on top of MobileNet
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
x = Dense(1024, activation='relu')(x)
x = Dense(512, activation='relu')(x)
preds = Dense(3, activation='softmax')(x)

# Define the model with base MobileNet and custom classification layers
model = Model(inputs=base_model.input, outputs=preds)

# Freeze the first 20 layers (up to the last convolutional block) of the base model
for layer in model.layers[:20]:
    layer.trainable = False

# Unfreeze the remaining layers for fine-tuning
for layer in model.layers[20:]:
    layer.trainable = True
```

### Model Compilation
```python
from keras.optimizers import Adam
from keras.callbacks import EarlyStopping

# Define Adam optimizer with custom learning rate and other parameters
adam_optimizer = Adam(learning_rate=0.0001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=1e-5, amsgrad=False)

# Early stopping callback to prevent overfitting
early_stopping = EarlyStopping(patience=5)

# Compile the model with Adam optimizer, categorical cross-entropy loss, and accuracy metric
model.compile(optimizer=adam_optimizer, loss='categorical_crossentropy', metrics=['accuracy'])
```

### Model Summary
```python
# Display model summary showing architecture and number of trainable parameters
model.summary()
```

## Explanation
- **Model Architecture**: MobileNet is loaded with pre-trained ImageNet weights, and custom classification layers are added on top to adapt it for Areca plate classification.
- **Model Compilation**: Adam optimizer is configured with a custom learning rate and other parameters. Categorical cross-entropy is chosen as the loss function, and accuracy is used as the evaluation metric.
- **Model Summary**: The `summary()` function displays a summary of the model architecture, including layer types, output shapes, and number of trainable parameters.

## Conclusion
By following this structured approach, you can effectively develop and deploy a system for automating the quality grading of Areca plates using CNNs, contributing to environmental sustainability and efficiency.



**LinkedIn Profile**: [Akshay G Gouda](https://www.linkedin.com/in/akshay-g-gouda-1bb424202)
