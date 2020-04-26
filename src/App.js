import React, { useState, useEffect } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    api.post("repositories/" + id + "/like").then(
      (response) => {
        console.log("like dado ao repo " + id);

        /*repositories.reduce((repositoriesOld, newRepositories) => [
          repositories[id],
          response.data,
        ]);*/

        api.get("repositories").then((response) => {
          console.log(response.data);
          setRepositories(response.data);
        });
      }

      // Implement "Like Repository" functionality
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <FlatList
            data={repositories}
            keyExtractor={(repository) => repository.id}
            renderItem={({ item: repository }) => (
              <>
                <Text style={styles.repository}>{repository.title}</Text>

                {/*techs container */}
                <View style={styles.techsContainer}>
                  {/*
                  Tentei usar foreach mas por algum estranho motivo não funcionou :s
                  repository.techs.forEach((tech, i) => (
                    <Text style={styles.tech} key={i}>
                      {tech}
                    </Text>
                  ))*/}

                  {repository.techs.map((tech) => (
                    <Text key={tech.id} style={styles.tech}>
                      {tech}
                    </Text>
                  ))}
                </View>

                {/*likes container */}
                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {repository.likes} curtida
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </>
            )}
          />

          {/*<Text style={styles.repository}>Repository 1</Text>*/}

          {/*
          Listar os repositórios da sua API: 
          Deve ser capaz de criar uma lista de todos os repositórios que estão 
          cadastrados na sua API com os campos title, techs e número de curtidas seguindo o padrão ${repository.likes} 
          curtidas, apenas alterando o número para ser dinâmico.
          */}

          {/*<View style={styles.techsContainer}>
            <Text style={styles.tech}>ReactJS</Text>
            <Text style={styles.tech}>Node.js</Text>
          </View>*/}

          {/* 
          Curtir um repositório listado da API: 
          Deve ser capaz de curtir um item na sua API através de um botão com o
           texto Curtir e deve atualizar o número de likes na listagem no mobile.
          */}

          {/*<View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-1`}
            >
              3 curtidas
            </Text>
          </View>*/}

          {/*<TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(1)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-1`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>*/}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
