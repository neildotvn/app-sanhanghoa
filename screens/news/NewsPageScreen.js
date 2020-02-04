import React from "react";
import { StyleSheet, Platform, Image, View, WebView } from "react-native";
import { MediumText, RegularText } from "../../components/common/StyledText";
import { FlatList, TouchableNativeFeedback } from "react-native-gesture-handler";
import NavigationService from "../../navigation/NavigationService";
import Loading from "../../components/common/Loading";
import Colors from "../../constants/Colors";
import axios from "../../utils/AxiosS";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

function Article(props) {
    const article = props.data.item;
    let imageUrl = "sdjfhs";
    try {
        imageUrl = article._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
    } catch (err) {
        console.log("There's no featured image!");
    }
    return (
        <TouchableNativeFeedback onPress={() => props.onArticlePressed(article)}>
            <View style={styles.articleContainer}>
                <View style={styles.imageContainer}>
                    <Image style={{ flex: 1 }} source={{ uri: imageUrl }} />
                </View>
                <MediumText style={styles.title}>{article.title.rendered}</MediumText>
                <RegularText style={styles.excerpt}>
                    {article.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
                </RegularText>
            </View>
        </TouchableNativeFeedback>
    );
}

export default class NewsPageScreen extends React.Component {
    state = {
        data: [],
        loading: true
    };

    componentDidMount() {
        this._mounted = true;
        axios
            .get(
                `posts?per_page=10&_fields=id,date,title,excerpt,link,_links&_embed&categories=${this.props.tab.categories}`
            )
            .then(response => {
                if (this._mounted) this.setState({ data: response.data, loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err);
            });
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    onArticlePressed = article => {
        NavigationService.navigate("NewsArticle", { uri: article.link });
    };

    render() {
        return this.state.loading ? (
            <Loading style={styles.loading} text="Đang tải bài viết" />
        ) : (
            <FlatList
                style={styles.container}
                data={this.state.data}
                renderItem={data => <Article data={data} onArticlePressed={this.onArticlePressed} />}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingStart: 12,
        paddingEnd: 12,
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 12,
        marginBottom: 36
    },
    articleContainer: {
        marginBottom: 12
    },
    imageContainer: {
        height: 250,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: Colors.grey
    },
    title: {
        textTransform: "uppercase",
        color: Colors.darkBlue,
        fontSize: 16,
        marginTop: 4
    },
    excerpt: {
        fontSize: 12,
        color: Colors.black3
    },
    loading: {
        marginTop: hp(35)
        // position: "absolute",
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0
        // flex: 1
    }
});
