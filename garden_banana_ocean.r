# File Name: TheBetterHealthProject.R

# Load libraries
library(reshape2)
library(ggplot2)
library(dplyr)
library(caret)

# Load data
data <- read.csv("HealthData.csv")

# explore data
## Check the structure of the data 
str(data)
## Output summary statistics 
summary(data)

# Exploratory Data Analysis 
## Visualize the distribution of age 
ggplot(data, aes(x = age)) + 
  geom_histogram(bins = 3, fill = "#2B6EAE") +
  labs(title = "Distribution of Participant Age",
       x = "Age (Years)",
       y = "Count")

## Plot the distribution of BMI
ggplot(data, aes(x = bmi)) + 
  geom_histogram(bins = 4, fill = "#2B6EAE") +
  labs(title = "Distribution of Participant BMI",
       x = "BMI",
       y = "Count")
       
# Data preparation 
## Create model matrix for the participants
modelmatrix <- model.matrix( ~ bmi + gender -1, data = data)
## Select predictor and target variables 
X <- as.matrix(modelmatrix)
y <- data$chronic_disease

# Model Fitting 
## Split the data into training and test datasets
set.seed(200)
index <- createDataPartition(y = y, p = 0.8, list = FALSE)
X_train <- X[index,]
y_train <- y[index]

X_test <- X[-index,]
y_test <- y[-index]

## Fit a Logistic Regression model 
fit <- glm(y_train ~ X_train, family = "binomial")
## Calculate model accuracy
train_predprob <- predict(fit, newdata = X_train, type = "response")
test_predprob <- predict(fit, newdata = X_test, type = "response")

train_predclass <- ifelse(train_predprob > 0.5, 1, 0)
test_predclass <- ifelse(test_predprob > 0.5, 1, 0)

train_accuracy <- mean(y_train == train_predclass)
test_accuracy <- mean(y_test == test_predclass)

# Evaluate model performance 
## Plot ROC curve
library(ROCR)

train_model <- prediction(train_predprob, y_train)
test_model <- prediction(test_predprob, y_test)

train_perf <- performance(train_model, measure = "tpr", x.measure = "fpr")
test_perf <- performance(test_model, measure = "tpr", x.measure = "fpr")

ggplot() + 
  geom_line(aes(x = as.numeric(train_perf@x.values[[1]]), y = as.numeric(train_perf@y.values[[1]])), color = "#B4B4B4", size = 1) +
  geom_line(aes(x = as.numeric(test_perf@x.values[[1]]), y = as.numeric(test_perf@y.values[[1]])), color = "#FF5A5F", size = 1) +
  labs(title = "Receiver Operating Characteristic Curve",
       x = "False Positive Rate",
       y = "True Positive Rate")
       
## Estimate Area under the Curve 
x <- prediction(train_predprob, y_train)
y <- prediction(test_predprob, y_test)

train_perf <- performance(x, measure = "auc")
test_perf <- performance(y, measure = "auc")

train_auc <- as.numeric(train_perf@y.values[[1]])
test_auc <- as.numeric(test_perf@y.values[[1]])

# Output results 
print(paste("The training accuracy of the model is", round(train_accuracy, 2)))
print(paste("The test accuracy of the model is", round(test_accuracy, 2)))
print(paste("The training AUC of the model is", round(train_auc, 2)))
print(paste("The test AUC of the model is", round(test_auc, 2)))