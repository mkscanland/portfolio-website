<template>
  <div class="wrapperSection bg-spotlight text-secondary px-4 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">Random Forest Categorization</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">
          Solving housing prices using custom-built machine learning. A graduate class project:<br />
          For the full code and README please visit the<br /><a
            class="btn btn-outline-info btn-sm px-4 me-sm-3 fw-bold"
            href="https://github.com/mkscanland/Random-Forest"
            >GitHub Page</a
          >
        </p>
      </div>
    </div>
  </div>
  <div class="wrapperSection py-0 pb-5 bg-light position-relative text-secondary px-4">
    <div class="title">Main Information</div>
    <div class="px-4 pt-5 mb-5 border-bottom">
      <div class="col-lg-12 mx-auto">
        <p class="lead mb-4">
          In this project a Random Forest model is presented using Information Gain and Entropy for
          each split on a decision tree. A "batch" method is used to build each decision tree in the
          forest. The model creates X number of decision trees and calculates the average of each
          prediction to determine a best estimate. The best accuracy recorded is: 79.22%. It took 42
          minutes to build the forest with 96MB of memory used. However, adjusting the
          hyperparameters further may help.
        </p>
      </div>
    </div>
    <div class="row g-5">
      <div class="col-md-4">
        <div>
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">Structure</h4>
            <p>
              A decision tree consists of several <q>Node</q> classes. Every Node contains the
              variables; left, right, data, key, name, numSamples, isString, and colHeaders. The
              left and right variables are also meant to be Node classes which, for the purpose of
              this project, are nodes to separate data on a split. The data, key, and name variables
              store information to determine a split on prediction. numSamples is the number of
              samples in this Node, mainly used for information output. isString tells if the
              feature column that this node is split on contains String objects (True if it is a
              String). colHeaders provide the column headers for this set of data since the order of
              the features is randomized.
            </p>
          </div>
          <div class="p-4 mb-3 bg-light rounded">
            <h4 class="fst-italic">Splitting</h4>
            <p>
              To determine the best split the algorithm takes into consideration the current node's
              data and returns the optimal data column that the split should be made. This is done
              by determining the information gain, using a simple Entropy algorithm. If the feature
              with the best information gain only contains the <q>NA</q> value for each sample None
              values are returned to indicate there is no best split.<br />
              During the splitting process samples are placed into left and right data arrays along
              with their training targets. The left array contains values that are equivalent to the
              best split value for categorical features, and it contains values that are less than
              or equal to the best split value for numerical features, or <q>NA</q> values.
            </p>
          </div>
          <div class="p-4 border-bottom bg-light rounded">
            <h4 class="fst-italic">Hyperparameter Tuning</h4>
            <p>
              Hyperparameters are the parameters when building a Random Forest that can help to
              fine-tune predictions. A break-down of each hyperparameter follows:
            </p>
          </div>
          <div class="p-4 border-bottom bg-light rounded">
            <ul>
              <li>
                numTrees -- Increases accuracy but increases computational time.
                <ul>
                  <li>
                    Think of this parameter as increasing the number of people you go to for advice
                    about a topic. The more voices you get the more information you can parse
                    through to make an accurate observation. However, the more people you talk to
                    increases the time it takes to make the observation.
                  </li>
                </ul>
              </li>
              <li>
                maxDepth -- Increases the accuracy as maxDepth increases, up to a certain amount
                <ul>
                  <li>
                    This parameter can be tuned for a set of data. A decision tree is able to split
                    a certain number of times until there is no more information to be gained from a
                    split. In the house pricing index data the optimal maximum depth is around 25,
                    depending on the random features selected.
                  </li>
                </ul>
              </li>
              <li>
                numBatches -- Lowers the correlation among trees
                <ul>
                  <li>
                    This parameter can be tuned to decrease the correlation between each of the
                    trees which strengthens the Random Forest increasing accuracy. The normal
                    optimal value for this parameter in a regression problem is M/3, where M is the
                    number of features (Breiman, Leo, 2001). However, I found that roughly M/4 works
                    well for this data set.
                  </li>
                </ul>
              </li>
              <li>
                minSamplesRestriction -- Prevents overfitting by restricting sample size for a node
                <ul>
                  <li>
                    This parameter simply prevents overfitting by restricting the minimum number of
                    samples allowed on each node for a split. With categorical features this
                    parameter doesn't get used often. However, with numeric features the parameter
                    helps to prevent a leaf node containing a small amount of data points.
                  </li>
                </ul>
              </li>
              <li>
                minInformationGain -- Prevents overfitting
                <ul>
                  <li>
                    The minimum information gain required for a node to split can help with
                    overfitting. However, if it's set to a value that is too high it will begin to
                    underfit the data and prevent the tree from growing to it's best height.
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <article class="blog-post">
          <h3>Purpose</h3>
          <p>
            The purpose of this project is to choose a model that will suit a dataset that the
            student finds interesting. I chose to implement a Random Forest, also known as Ensemble,
            model with a dataset of house prices based on house features. The data consists of
            different facets of a house (Kaggle.com Overview). This includes the square footage, if
            a garage exists, the lot area, if the street is paved, and many more descriptions of a
            house. There are 79 total features in the training and testing set with 1461 and 1460
            samples respectively.<br /><br />
            Using this data, the model builds a decision tree by determining the best split for each
            decision node until some conditions are met. In order to prevent overfitting and
            increase testing accuracy X number of decision trees are created, this is called the
            Random Forest. Given a set of data each tree in the Forest can predict the cost of each
            sample in the data. These predictions are averaged to obtain the final prediction for
            that sample.
          </p>
          <hr />
          <h3>Theoretical Description</h3>
          <div class="overflow-hidden" style="max-height: 40vh">
            <div class="container px-5 text-center">
              <img
                src="~@/assets/images/RandomForest-Example.png"
                class="img-fluid border rounded-3 shadow-lg mb-4"
                alt="Example image"
                loading="lazy"
              />
            </div>
          </div>
          <p class="pt-4">
            The Random Forest model is based on creating several decision trees and comparing their
            results for the best prediction. The process for creating the forest follows:
          </p>
          <ol>
            <li>
              The algorithm begins constructing decision trees one by one, randomizing the data
              columns for each tree to consider into K batches.
            </li>
            <li>
              Among the k features a decision tree is built by calculating the best split point.
            </li>
            <li>
              This splits the data into two nodes based on the feature with the best information
              gain.
            </li>
            <li>
              Steps 1-3 are repeated until some maximum depth is reached or minimum samples
              condition is met.
            </li>
            <li>Steps 1-4 are repeated until X number of decision trees are created.</li>
          </ol>
          <p>
            After the Random Forest creation, targets can be predicted from any number of samples.
            The predictions algorithm simply takes each of the decision trees in the Random Forest
            and averages each prediction for that sample to give a robust prediction value. In the
            case of Classification (rather than the previously stated Regression) instead of taking
            the average, the robust prediction is determined by a majority vote.
          </p>
          <hr />
          <h3>Overview and Data Analysis</h3>
          <p class="pt-4">
            The program starts by grabbing samples and targets from the CSV file. This function
            simply retrieves the data from the CSV and organizes it into arrays for training
            features, training samples, and testing features. Some unnecessary columns are removed
            from the training and testing sets.<br />
            This unnecessary data is found and manually determining which features should be
            removed. Any features with a relatively very small (&lt;0.006) amount of information
            gain are removed. After removing these features a more consistent accuracy is
            observed.<br />
            The Random Forest starts by creating X trees based on the numTrees variable in a for
            loop. The data is randomized by selecting k (k = M/numBatches, M = total number of
            features) features in each <q>batch</q>. Each tree is appended to the forest list. This
            list is returned after numTrees have been created.<br />
            Every decision tree begins with a set of training data which is fed into a
            <q>buildTree</q> function. This is a recursive function which first checks some
            conditions to determine if it should return a prediction or another Node; the maximum
            depth of the tree has not been reached and if this node has enough samples (line 275).
            If these two conditions are met the algorithm attempts to split the node into a left
            node and a right node. Upon splitting, if the samples don't consist of only
            <q>NA</q> values, the algorithm calls the <q>buildTree</q> function for the left and
            right nodes and their respective data. Otherwise it creates a prediction leaf node. This
            process is repeated until the maximum depth has been reached or there aren't enough
            samples to split.<br />
            After the Random Forest is created the accuracy is tested with some training samples
            that were set aside for testing.
          </p>
          <hr />
          <h3>Results</h3>
          <div class="overflow-hidden" style="max-height: 40vh">
            <div class="container px-5 text-center">
              <img
                src="~@/assets/images/RandomForest-Optimal-Results.png"
                class="img-fluid border rounded-3 shadow-lg mb-4"
                alt="Example image"
                loading="lazy"
              />
            </div>
          </div>
          <p>
            <b>Best Results:</b><br />
            The best results in terms of accuracy occur at a large number of trees with a maximum
            depth of 25 and 4 batches. Although these were the best results, they don't show the
            optimal hyperparameters. Building the forest takes 42 minutes. Unless time isn't a
            concern in building the model or prediction this isn't optimal. A submission that I
            posted to Kaggle received a root mean squared score of 0.30734.
          </p>
          <p>
            <b>Optimal Results:</b><br />
            The optimal results occur when the; number of trees is large (~50), maximum depth is
            roughly 25, number of batches is 4, and the minimum sample restrictions is 35. These
            optimal parameters were found by first increasing the maximum depth until the error rate
            plateaued. The minimum sample restrictions are specific to the data provided by my best
            guess from trial and error, it was chosen to be ~35. The number of batches is optimal at
            M/3. However, at 4 batches it was observed that the error rate is more consistent.<br /><br />
            The hyperparameters in regards to computational time is dynamic. Less trees and a
            shallower depth are better for faster computational time. However, if your goal is to
            increase accuracy, more trees and a depth of ~25 is the best. Therefore, as the number
            of trees and maximum depth in the forest increases, so does the computational time and
            memory used.
          </p>
        </article>
      </div>
    </div>
  </div>
</template>
